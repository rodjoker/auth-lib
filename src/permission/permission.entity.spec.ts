 
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from '../role/role.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; 

  @ManyToOne(() => Role, role => role.permissios, { onDelete: 'CASCADE' })
  role: Role;
}