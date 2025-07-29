import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Permission } from '../permission/entities/permission.entity';


@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => User, user => user.rol)
  users: User[];

  @OneToMany(() => Permission, (permission: Permission) => permission.role, {
    cascade: true,
  })
  permissions: Permission[];
  
  

}


 

