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

  async registerUsers(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.userService.findByEmail(dto.email);
    if (existUser) throw new BadRequestException(AppError.USER_EXIST);
    try {
      return this.userService.createUser(dto);
    } catch (error) {
      throw new Error(error);
    }
  }
  async loginUsers(dto: LoginUserDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findByEmail(dto.email);
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    const userData = {
      firstName: existUser.firstName,
      lastName: existUser.lastName,
      email: existUser.email,
      id: existUser.id,
    };

    try {
      const token = this.tokenService.generateJwtToken(userData);
      const user = await this.userService.publicUser(dto.email);
      return { ...user, token };
    } catch (error) {
      throw new Error(error);
    }
  }
}
