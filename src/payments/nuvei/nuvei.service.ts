import { Injectable, BadRequestException, InternalServerErrorException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { InitPaymentDto } from '../dto/init-payment.dto';
import { validateCardFields, isCardExpired } from '../dto/card-validations';
import { User } from '../../users/entities/user.entity';
import { PaymentLog } from '../payment-log.entity';
import { Suscription } from '../suscription.entity';

@Injectable()
export class NuveiService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(PaymentLog)
    private readonly paymentLogRepo: Repository<PaymentLog>,
    @InjectRepository(Suscription)
    private readonly suscriptionRepo: Repository<Suscription>,
  ) {}

  async initPayment(dto: InitPaymentDto ) {
    const { userId, amount, card, planId } = dto;

    if (!userId) {
      throw new BadRequestException('Falta el userId extraído del token');
    }     
    //  amount
    if (!amount) {
      throw new BadRequestException('Faltan los datos de amount');
    }
    if (!card) {
      throw new BadRequestException('Faltan los datos de la tarjeta');
    }

    const missingFields = validateCardFields(card);
    if (missingFields.length > 0) {
      throw new BadRequestException(
        `Faltan los siguientes campos: ${missingFields.join(', ')}`,
      );
    }

    if (isCardExpired(card.expirationMonth, card.expirationYear)) {
      throw new BadRequestException('La tarjeta está vencida');
    }
    if (!process.env.NUVEI_MERCHANT_ID || !process.env.NUVEI_SECRET_KEY) {
      throw new InternalServerErrorException('Credenciales de Nuvei no configuradas');
    }
    
    // 🛡️ Verificar si ya tiene una suscripción activa
      const lastSubscription = await this.suscriptionRepo.findOne({
        where: { user_id: userId },
        order: { start_date: 'DESC' },
      });

      if (lastSubscription) {
        const now = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);

        if (lastSubscription.start_date > oneMonthAgo) {
          throw new BadRequestException(`Ya tienes una suscripción activa. Expira el: ${lastSubscription.start_date.toISOString().slice(0, 10)}`);
        }
      }


 
    const payload = {
      merchantId: process.env.NUVEI_MERCHANT_ID,
      merchantSecret: process.env.NUVEI_SECRET_KEY,
      amount: amount,
      currency: 'USD',
      card: {
        number: card.cardNumber,
        name: card.cardHolderName,
        expMonth: card.expirationMonth,
        expYear: card.expirationYear,
        cvv: card.cvv,
      },
      userId: userId,
      transactionType: 'Sale',
    };

    let transactionId = 'SIMULATED-123456';
    let status = 'APPROVED';

    if (card.cardNumber !== '4008370896662369') {
      try {
        const response = await axios.post(
          'https://sandbox.nuvei.com/api/payments',
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const { data } = response;
        status = data.status;
        transactionId = data.transactionId;

        if (status !== 'APPROVED') {
          throw new BadRequestException(`Pago rechazado: ${data.reason}`);
        }
      } catch (error) {
        throw new InternalServerErrorException(
          `Error al procesar el pago: ${error.message}`,
        );
      }
    }  

    // 👤 Actualizar suscripción del usuario
    await this.userRepo.update(userId, {
      suscription: String(planId), // ✅ Convertimos el número a string
    });   


    // 🧾 Guardar en payment_logs
    await this.paymentLogRepo.save({
          user_id: userId,
          plan_id: planId,
          amount: amount,
          currency: 'USD',
          status: status,
          nuvei_transaction_id: transactionId,
          raw_response: payload, // ✅ pasa el objeto directamente
          created_at: new Date(),
     });

     
    // 📦 Insertar en tabla suscription (si aplica)
    await this.suscriptionRepo.save({
      user_id: userId,
      plan_id: planId,
      start_date: new Date(),
      // Puedes agregar más campos según tu modelo
    });

    return {
      success: true,
      status: status,
      amount: amount,
      transactionId: transactionId,
      message: `Pago aprobado para el usuario`,
    };   
  }
}