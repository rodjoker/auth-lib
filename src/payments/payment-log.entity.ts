import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  plan_id: number;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  status: string;

  @Column()
  nuvei_transaction_id: string;

  @Column('jsonb')
  raw_response: any;

  @Column()
  created_at: Date;
}