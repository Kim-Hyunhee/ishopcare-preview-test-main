import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'inquiry' })
export class InquiryEntity {
  @PrimaryKey({ name: 'id' })
  id?: number;

  @Property({ name: 'phoneNumber' })
  phoneNumber!: string;

  @Property({ name: 'industryTypeId' })
  industryTypeId!: number;

  @Property({ name: 'corporateRegistrationNumber' })
  corporateRegistrationNumber?: string;

  @Property({ name: 'isPrivacyAgreed' })
  isPrivacyAgreed!: boolean;

  @Property({ name: 'isMarketingAgreed' })
  isMarketingAgreed?: boolean;

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
