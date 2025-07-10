import { EntityRepository, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { InquiryEntity } from './inquiry-entity';
import { FindInquiryDto } from 'src/api/internal/dto/find-inquiry.dto';

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

  async findByFilter(dto: FindInquiryDto) {
    const { phoneNumber, startDate, endDate, page, limit } = dto;

    const where: FilterQuery<InquiryEntity> = {};

    if (phoneNumber) {
      where.phoneNumber = phoneNumber;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.$gte = startDate;
      if (endDate) where.createdAt.$lte = endDate;
    }

    const [data, total] = await this.writeRepository.findAndCount(where, {
      orderBy: { createdAt: 'DESC' },
      limit,
      offset: (page - 1) * limit,
    });

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
