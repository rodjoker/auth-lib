import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { NuveiService } from './nuvei/nuvei.service';
import { InitPaymentDto } from './dto/init-payment.dto';
import { RequestWithUser } from 'src/auth/interfaces/request-wirh-user.interface';

@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly nuveiService: NuveiService) {}

  @Post('init')
   async initPayment(@Req() req: RequestWithUser, @Body() dto: InitPaymentDto){
     dto.userId = req.user.userId; 
     return this.nuveiService.initPayment(dto);
   }
 /* init(@Body() dto: InitPaymentDto) {
    return this.nuveiService.initPayment(dto);
  }*/

}