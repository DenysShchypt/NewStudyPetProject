import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto';
import { AppError } from '../../common/constants/errors';
import { LoginUserDTO } from './dto';
import { AuthUserResponse } from './responses';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async registerUsers(
    dto: CreateUserDTO,
  ): Promise<AuthUserResponse | BadRequestException> {
    const existUser = await this.userService.findByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    try {
      await this.userService.createUser(dto);
      return await this.userService.publicUser(dto.email);
    } catch (error) {
      throw new Error(error);
    }
  }
  async loginUsers(
    dto: LoginUserDTO,
  ): Promise<AuthUserResponse | BadRequestException> {
    const existUser = await this.userService.findByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    try {
      return await this.userService.publicUser(dto.email);
    } catch (error) {
      throw new Error(error);
    }
  }
}
