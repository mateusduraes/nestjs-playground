import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash, compare } from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async register(user: User): Promise<User> {
    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);

    try {
      return this.userRepository.save(user);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  async update(id: number, user: Partial<User>): Promise<any> {
    return this.userRepository.update(id as any, {
      ...user as any,
    });
  }

  async login(credentials: Partial<User>): Promise<any> {
    const { email, password } = credentials;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('User not found with given email', HttpStatus.BAD_REQUEST);
    }
    
    const { password: hashPassword, id } = user;
    const matchPassword = await compare(password, hashPassword);
    if (!matchPassword) {
      throw new HttpException('The password is not correct', HttpStatus.BAD_REQUEST);
    }

    const token = jwt.sign({ id, email }, 'my-secret-key');
    delete user.password;
    return { user, token };
  }

}
