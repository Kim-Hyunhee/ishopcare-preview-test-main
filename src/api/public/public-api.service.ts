import { BadRequestException, Injectable } from '@nestjs/common';
import { InquiryRepository } from '../../mikro-orm/entities/inquiry/inquiry-repository';
import { InquiryEntity } from 'src/mikro-orm/entities/inquiry/inquiry-entity';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { validatePhoneNumber } from 'src/utils/phone-number.util';

@Injectable()
export class PublicApiService {
  constructor(private readonly inquiryRepository: InquiryRepository) {}

  async createInquiry(dto: CreateInquiryDto): Promise<InquiryEntity> {
    // 전화번호 유효성 검사
    try {
      validatePhoneNumber(dto.phoneNumber); // ⬅️ 유효성 검사 실행
    } catch (err) {
      throw new BadRequestException(err);
    }

    const inquiry = new InquiryEntity();
    inquiry.phoneNumber = dto.phoneNumber;
    inquiry.industryTypeId = dto.industryTypeId;
    inquiry.corporateRegistrationNumber = dto.corporateRegistrationNumber;
    inquiry.isPrivacyAgreed = dto.isPrivacyAgreed;
    inquiry.isMarketingAgreed = dto.isMarketingAgreed;

    await this.inquiryRepository.create(inquiry);

    return inquiry;
  }
}
