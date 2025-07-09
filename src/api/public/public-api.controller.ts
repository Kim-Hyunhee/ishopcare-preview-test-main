import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicApiService } from './public-api.service';
import { InquiryEntity } from 'src/mikro-orm/entities/inquiry/inquiry-entity';
import { CreateInquiryDto } from './dto/create-inquiry.dto';

@ApiTags('Public API')
@Controller('public')
export class PublicApiController {
  constructor(private readonly publicApiService: PublicApiService) {}

  @ApiOperation({ summary: '구매 상담 등록 API' })
  @Post('/inquiry')
  createInquiry(@Body() dto: CreateInquiryDto): Promise<InquiryEntity> {
    return this.publicApiService.createInquiry(dto);
  }
}
