import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InquiryRepository } from '../mikro-orm/entities/inquiry/inquiry-repository';
import { getTaxpayerStatus } from './utils/tax-status.util';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);

  constructor(private readonly inquiryRepository: InquiryRepository) {}

  @Cron('* * * * * *')
  async run() {
    this.logger.log('🌀 사업자 상태 조회 배치 시작');

    const inquiries = await this.inquiryRepository.findWithCorporateNumber();

    for (const inquiry of inquiries) {
      const corpNo = inquiry.corporateRegistrationNumber;
      if (!corpNo) continue;

      const status = await getTaxpayerStatus(corpNo);
      if (status) {
        await this.inquiryRepository.updateStatus(inquiry.id!, status);
        this.logger.log(`✔️ ${corpNo} 상태: ${status}`);
      } else {
        this.logger.warn(`❌ ${corpNo} 상태 조회 실패`);
      }
    }

    this.logger.log('✅ 사업자 상태 조회 배치 완료');
  }
}
