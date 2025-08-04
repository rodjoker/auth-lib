import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  priceMonthly: number;

  @Column('decimal', { precision: 10, scale: 2 })
  priceSemiannual: number;

  @Column('decimal', { precision: 10, scale: 2 })
  priceAnnual: number;

  @CreateDateColumn()
  createdAt: Date;
}