import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BizStatusService } from './biz-status.service';

@Module({
  imports: [HttpModule],
  providers: [BizStatusService],
  exports: [BizStatusService],
})
export class BizStatusModule {}
