import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { InquiryEntity } from './inquiry-entity';

@Injectable()
export class InquiryRepository {
  constructor(
    @InjectRepository(InquiryEntity)
    private readonly writeRepository: EntityRepository<InquiryEntity>,
  ) {}

  async create(inquiry: InquiryEntity) {
    this.writeRepository.create(inquiry);
    await this.writeRepository.getEntityManager().flush();
  }

  async findAll() {
    return await this.writeRepository.findAll();
  }

  async findByPhoneNumber(phoneNumber: string): Promise<InquiryEntity[]> {
    return await this.writeRepository.find({ phoneNumber });
  }

  async findWithCorporateNumber(): Promise<InquiryEntity[]> {
    return this.writeRepository.find({
      corporateRegistrationNumber: { $ne: null },
    });
  }

  async updateStatus(id: number, status: string): Promise<void> {
    const inquiry = await this.writeRepository.findOne({ id });
    if (inquiry) {
      inquiry.taxpayerStatus = status;
      await this.writeRepository.getEntityManager().flush();
    }
  }
}
