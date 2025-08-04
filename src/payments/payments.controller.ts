import { Controller, Post, Body } from '@nestjs/common';
import { NuveiService } from './nuvei/nuvei.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly nuveiService: NuveiService) {}

  @Post('init')
  init(@Body() dto: { userId: number; amount: number }) {
    return this.nuveiService.initPayment(dto.userId, dto.amount);
  }
}