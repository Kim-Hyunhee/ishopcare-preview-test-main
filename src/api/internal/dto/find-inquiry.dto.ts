import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindInquiryDto {
  @ApiProperty()
  @IsString()
  phoneNumber!: string;
}