import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  IsInt,
  Matches,
} from 'class-validator';

export class CreateInquiryDto {
  @ApiProperty()
  @IsString()
  @Matches(/^01[016789]-?\d{3,4}-?\d{4}$/, {
    message: '잘못된 전화번호 형식입니다',
  })
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
