import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './models/user.model';
import { CreateUserDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password) {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error(error);
    }
  }
  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new Error(error);
    }
  }
  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const hashPassword = await this.hashPassword(dto.password);
    console.log('hashPassword: ', hashPassword);

    try {
      await this.userRepository.create({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: hashPassword,
      });
      return dto;
    } catch (error) {
      throw new Error(error);
    }
  }
}
