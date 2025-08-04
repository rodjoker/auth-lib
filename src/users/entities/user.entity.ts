import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from '../../role/role.entity';  

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '', unique: true, type: 'varchar', nullable: false})
  username: string;

  @ManyToOne(() => Role, rol => rol.users)
  @JoinColumn({ name: 'role_id' })
  rol: Role;

  @Column({default: '12345'})
  password: string;

  @Column({default: ''})
  name: string;

  @Column({default: ''})
  lastname: string;

  @Column({default: '', unique: true })
  email: string;

  @Column({ default: 'Free' })
  suscription: string; // Puedes usar Enum si lo prefieres
}