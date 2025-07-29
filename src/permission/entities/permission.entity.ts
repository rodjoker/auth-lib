import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from 'src/role/role.entity';

@Entity()
export class Permission { // ← esta palabra "export" es esencial
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Role, role => role.permissions, { onDelete: 'CASCADE' })
  role: Role;
}