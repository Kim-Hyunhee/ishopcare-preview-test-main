import { Injectable } from '@nestjs/common';
import { InquiryRepository } from '../../mikro-orm/entities/inquiry/inquiry-repository';
import { FindInquiryDto } from './dto/find-inquiry.dto';

@Injectable()
export class InternalApiService {
  constructor(private readonly inquiryRepository: InquiryRepository) {}

  async getInquiries(dto: FindInquiryDto) {
    return this.inquiryRepository.findByFilter(dto);
  }
}
