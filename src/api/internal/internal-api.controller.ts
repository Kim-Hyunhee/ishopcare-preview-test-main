import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InternalApiService } from './internal-api.service';
import { FindInquiryDto } from './dto/find-inquiry.dto';

@ApiTags('Internal API')
@Controller('internal')
export class InternalApiController {
  constructor(private readonly internalApiService: InternalApiService) {}

  @ApiOperation({ summary: '구매 상담 조회 API' })
  @Get('/inquiries')
  getInquiries(@Query() { phoneNumber }: FindInquiryDto) {
    return this.internalApiService.getInquiries({ phoneNumber });
  }
}
