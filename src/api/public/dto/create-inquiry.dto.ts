import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateInquiryDto {
  @ApiProperty()
  @IsString()
  phoneNumber!: string;

  @ApiProperty()
  @IsInt()
  industryTypeId!: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  corporateRegistrationNumber?: string;

  @ApiProperty()
  @IsBoolean()
  isPrivacyAgreed!: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isMarketingAgreed?: boolean;
}
