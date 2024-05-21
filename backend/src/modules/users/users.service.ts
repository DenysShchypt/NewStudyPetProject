import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { User } from './models/user.model';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { UpdateUserResponse } from './responses';
import { AppError } from '../../common/constants/errors';

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

  async publicUser(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(
    id: string,
    dto: UpdateUserDTO,
  ): Promise<UpdateUserResponse> {
    const user = await this.userRepository.findByPk(id);
    if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);
    try {
      await this.userRepository.update(dto, {
        where: { id },
      });
      return plainToInstance(UpdateUserResponse, dto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findByPk(id);
    if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);
    try {
      await this.userRepository.destroy({ where: { id } });
    } catch (error) {
      throw new Error(error);
    }
  }
}
