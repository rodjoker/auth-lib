import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsController } from './payments.controller';
import { NuveiService } from './nuvei/nuvei.service';
import { User } from '../users/entities/user.entity';
import { PaymentLog } from './payment-log.entity';
import { Suscription } from './suscription.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, PaymentLog, Suscription]), // ✅ repositorios disponibles
  ],
  controllers: [PaymentsController],
  providers: [NuveiService],
  exports: [NuveiService],
})
export class PaymentsModule {}