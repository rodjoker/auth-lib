import { Injectable } from '@nestjs/common';

@Injectable()
export class NuveiService {
  initPayment(userId: number, amount: number) {
    // Aquí conectarías con la API real de Nuvei
    return {
      success: true,
      message: `Pago de $${amount} para el usuario ${userId} iniciado con Nuvei`,
    };
  }
}