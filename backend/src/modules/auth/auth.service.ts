import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto';
import { AppError } from '../../common/constants/errors';
import { LoginUserDTO } from './dto';
import { AuthUserResponse } from './responses';
import { TokenService } from '../token/token.service';
import { IToken } from '../../interfaces/auth';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private client: OAuth2Client;
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.client = new OAuth2Client(
      this.configService.get<string>('google_client_id'),
    );
  }

  public async registerUsers(
    dto: CreateUserDTO,
    agent: string,
  ): Promise<AuthUserResponse> {
    const newUser = await this.userService.createUser(dto).catch(error => {
      this.logger.error(`${AppError.ERROR_REGISTRATION}:${error.message}`);
      return null;
    });
    if (!newUser) throw new BadRequestException(AppError.USER_EXIST);
    const payload = {
      email: dto.email,
      firstName: dto?.firstName,
      lastName: dto.lastName,
      id: newUser.id,
      roles: newUser.roles,
    };
    const token: IToken = await this.tokenService.generateJwtToken(
      payload,
      agent,
    );
    // delete token.refreshToken;
    return { ...newUser, token };
  }

  public async verifyRegisterUser(verifyLink: string, agent: string) {
    const existUser = await this.prismaService.user.findFirst({
      where: { verifyLink },
    });
    if (!existUser)
      throw new BadRequestException(AppError.VERIFY_TOKEN_NOT_FOUND);
    const updateVerifyUser = await this.prismaService.user.update({
      where: { id: existUser.id },
      data: { verifyLink: 'active' },
    });
    const payload = {
      email: updateVerifyUser.email,
      firstName: updateVerifyUser.firstName,
      lastName: updateVerifyUser.lastName,
      id: updateVerifyUser.id,
      roles: updateVerifyUser.roles,
      provider: updateVerifyUser.provider,
    };
    const token: IToken = await this.tokenService.generateJwtToken(
      payload,
      agent,
    );
    return {
      ...updateVerifyUser,
      token,
    };
  }

  public async loginUsers(
    dto: LoginUserDTO,
    agent: string,
  ): Promise<AuthUserResponse> {
    const existUser = await this.userService
      .getUserAllInfo(dto.email, true)
      .catch(error => {
        this.logger.error(`${AppError.USER_NOT_EXIST}${error.message}`);
        return null;
      });
    if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const validatePassword = await bcryptjs.compare(
      dto.password,
      existUser.password,
    );
    if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA);
    delete existUser.password;
    const payload = {
      email: existUser.email,
      firstName: existUser.firstName,
      lastName: existUser.lastName,
      id: existUser.id,
      roles: existUser.roles,
    };
    const token: IToken = await this.tokenService.generateJwtToken(
      payload,
      agent,
    );
    return { ...existUser, token };
  }
  public async deleteRefreshToken(token: string) {
    return await this.prismaService.token.delete({ where: { token } });
  }

  public async getRefreshTokens(refreshToken: string, agent: string) {
    return await this.tokenService.refreshTokens(refreshToken, agent);
  }
}
