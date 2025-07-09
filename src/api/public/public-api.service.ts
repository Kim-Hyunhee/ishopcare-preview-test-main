import { Injectable } from '@nestjs/common';
import { InquiryRepository } from '../../mikro-orm/entities/inquiry/inquiry-repository';
import { InquiryEntity } from 'src/mikro-orm/entities/inquiry/inquiry-entity';
import { CreateInquiryDto } from './dto/create-inquiry.dto';

@Injectable()
export class PublicApiService {
  constructor(private readonly inquiryRepository: InquiryRepository) {}

  async createInquiry(dto: CreateInquiryDto): Promise<InquiryEntity> {
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