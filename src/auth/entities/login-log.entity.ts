import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LoginLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  timestamp: Date;

  @Column()
  ip: string;
}

