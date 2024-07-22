import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto';
import { AppError } from '../../common/constants/errors';
import { GoogleUserDTO, LoginUserDTO } from './dto';
import { AuthUserResponse } from './responses';
import { TokenService } from '../token/token.service';
import { IToken } from '../../interfaces/auth';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Provider, Role } from '@prisma/client';
import { USER_SELECT_FIELDS } from '../../common/constants/select-return';

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

  public async enterGoogleAuth(dto: GoogleUserDTO, agent: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      const newUser = await this.prismaService.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto.lastName,
          roles: [Role.USER],
          picture: dto.picture,
          provider: Provider.GOOGLE,
          providerId: dto.providerId,
        },
        select: USER_SELECT_FIELDS,
      });
      const payload = {
        email: dto.email,
        id: newUser.id,
        firstName: dto.firstName,
        lastName: dto.lastName,
        roles: newUser.roles,
      };
      const token = await this.tokenService.generateJwtToken(payload, agent);
      return { ...newUser, token };
    }
    const payload = {
      email: user.email,
      id: user.id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      roles: user.roles,
    };
    const token = await this.tokenService.generateJwtToken(payload, agent);
    return { ...user, token };
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
      firstName: dto.firstName,
      lastName: dto.lastName,
      id: newUser.id,
      roles: newUser.roles,
    };
    const token: IToken = await this.tokenService.generateJwtToken(
      payload,
      agent,
    );
    return { ...newUser, token };
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
    const validatePassword = await bcrypt.compare(
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
