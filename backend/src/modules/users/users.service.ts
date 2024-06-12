import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { User } from './models/user.model';
import { CreateUserDTO, UpdatePasswordDTO, UpdateUserDTO } from './dto';
import { UpdateUserResponse } from './responses';
import { AppError } from '../../common/constants/errors';
import { WatchList } from '../watch-list/models/watchList.model';
import { AuthUserResponse, UserResponse } from '../auth/responses';
import { TokenService } from '../token/token.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly tokenService: TokenService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, 10);
    } catch (error) {
      throw new Error(error);
    }
  }
  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { email },
        include: {
          model: WatchList,
          required: false,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async findById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { id },
        include: {
          model: WatchList,
          required: false,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async createUser(dto: CreateUserDTO): Promise<UserResponse> {
    const hashPassword = await this.hashPassword(dto.password);
    try {
      await this.userRepository.create({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: hashPassword,
      });
      return plainToInstance(UserResponse, dto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async publicUser(email: string): Promise<AuthUserResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
        include: {
          model: WatchList,
          required: false,
        },
      });
      const token = this.tokenService.generateJwtToken(user);
      return { user, token };
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
  async updateUserPassword(id: number, dto: UpdatePasswordDTO): Promise<any> {
    const user = await this.userRepository.findByPk(id);
    if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);
    try {
      const { password } = await this.findById(id);
      const currentPassword = await bcrypt.compare(dto.password, password);
      if (!currentPassword) throw new BadRequestException(AppError.WRONG_DATA);

      const data = { password: await this.hashPassword(dto.newPassword) };
      return await this.userRepository.update(data, {
        where: { id },
      });
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
