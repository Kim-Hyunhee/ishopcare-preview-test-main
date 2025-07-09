import { Injectable } from '@nestjs/common';
import { InquiryRepository } from '../../mikro-orm/entities/inquiry/inquiry-repository';
import { FindInquiryDto } from './dto/find-inquiry.dto';
import { InquiryEntity } from 'src/mikro-orm/entities/inquiry/inquiry-entity';

@Injectable()
export class InternalApiService {
  constructor(private readonly inquiryRepository: InquiryRepository) {}

  async getInquiries({ phoneNumber }: FindInquiryDto): Promise<InquiryEntity[]> {
    return this.inquiryRepository.findByPhoneNumber( phoneNumber ); 
  }
}
