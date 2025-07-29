import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from '../../role/role.entity';  



@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  
  @ManyToOne(() => Role, rol => rol.users)
  @JoinColumn({ name: 'role_id' })
  rol: Role;


  

  @Column()
  password: string;

}
