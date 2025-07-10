import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InquiryRepository } from '../mikro-orm/entities/inquiry/inquiry-repository';
import { BizStatusService } from 'src/libs/biz-status/biz-status.service';
import { chunk } from 'src/utils/array.util';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);

  constructor(
    private readonly inquiryRepository: InquiryRepository,
    private readonly bizStatusService: BizStatusService,
  ) {}

  @Cron('0 */30 * * * *') // 30분마다 실행
  async run() {
    this.logger.log('🌀 사업자 상태 조회 배치 시작');

    const oneDayAgo = new Date(Date.now() - 1000 * 60 * 60 * 24);

    const inquiries = await this.inquiryRepository.find({
      corporateRegistrationNumber: { $ne: null },
      $or: [
        {
          taxpayerStatus: null,
        },
        {
          statusCheckedAt: { $lt: oneDayAgo },
        },
      ],
    });

    const chunks = chunk(inquiries, 100);

    for (const chunk of chunks) {
      const corpNumbers = chunk.map((i) =>
        String(i.corporateRegistrationNumber),
      );
      const resultMap =
        await this.bizStatusService.getBulkTaxpayerStatus(corpNumbers);

      for (const inquiry of chunk) {
        const status = resultMap.get(
          String(inquiry.corporateRegistrationNumber),
        );
        if (status) {
          await this.inquiryRepository.updateStatus(
            inquiry.id!,
            status,
            new Date(),
          );
        }
      }
    }

    for (const inquiry of inquiries) {
      const corpNo = inquiry.corporateRegistrationNumber;
      if (!corpNo) continue;

      const status = await this.bizStatusService.getTaxpayerStatus(
        String(corpNo),
      );
      if (status) {
        await this.inquiryRepository.updateStatus(
          inquiry.id!,
          status,
          new Date(),
        );
        this.logger.log(`✔️ ${corpNo} 상태: ${status}`);
      } else {
        this.logger.warn(`❌ ${corpNo} 상태 조회 실패`);
      }
    }

    this.logger.log('✅ 사업자 상태 조회 배치 완료');
  }
}
