import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { NuveiService } from './nuvei/nuvei.service';

@Module({
  controllers: [PaymentsController],
  providers: [NuveiService],
})
export class PaymentsModule {}