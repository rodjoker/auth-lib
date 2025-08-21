import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity('suscription')
  export class Suscription {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'int' })
    user_id: number;
  
    @Column({ type: 'int' })
    plan_id: number;
  
    @CreateDateColumn({ type: 'timestamp' })
    start_date: Date;
  
    // Puedes agregar más campos si tu modelo lo requiere, como:
    // @Column({ type: 'timestamp', nullable: true })
    // end_date: Date;
  
    // @Column({ type: 'varchar', length: 50, nullable: true })
    // status: string;
  }