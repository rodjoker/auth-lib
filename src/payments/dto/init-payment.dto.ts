// src/payments/dto/init-payment.dto.ts
import { IsNumber, IsNotEmpty, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class CardDto {
  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @IsString()
  @IsNotEmpty()
  cardHolderName: string;

  @IsString()
  @IsNotEmpty()
  expirationMonth: string;

  @IsString()
  @IsNotEmpty()
  expirationYear: string;

  @IsString()
  @IsNotEmpty()
  cvv: string;
}

export class InitPaymentDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  amount: number;
  @IsNotEmpty()
  card: {
    cardNumber: string;
    cardHolderName: string;
    expirationMonth: number;
    expirationYear: number;
    cvv: string;
  };
 
  @IsNumber()
  @IsNotEmpty()
  planId: number; // ✅ Validación

}