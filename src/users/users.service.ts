// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
  return this.userRepository.findOne({ where: { username }, relations:['rol', 'rol.permissions'] });
}

  async create(username: string, password: string, rol): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = this.userRepository.create({ username, password: hashedPassword, rol });
  return this.userRepository.save(user);
}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
