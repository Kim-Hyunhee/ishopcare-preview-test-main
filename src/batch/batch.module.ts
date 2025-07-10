import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { InquiryRepositoryModule } from '../mikro-orm/entities/inquiry/inquiry-repository.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BizStatusModule } from 'src/libs/biz-status/biz-status.module';

@Module({
  imports: [ScheduleModule.forRoot(), InquiryRepositoryModule, BizStatusModule],
  providers: [BatchService],
})
export class BatchModule {}
