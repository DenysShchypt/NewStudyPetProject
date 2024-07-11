import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { add } from 'date-fns';
import { v4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { IAccessToken, IToken, IUserJWT } from '../../interfaces/auth';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  private async generateToken(user: IUserJWT, agent: string): Promise<IToken> {
    const payload = { user };
    const token =
      'Bearer ' +
      this.jwtService.sign(payload, {
        secret: this.configService.get('secret_jwt'),
        expiresIn: this.configService.get('expire_jwt'),
      });
    const refreshToken = await this.generateRefreshToken(user.id, agent);
    return { token, refreshToken };
  }

  private async generateRefreshToken(
    id: string,
    agent: string,
  ): Promise<IAccessToken> {
    const _token = await this.prismaService.token.findFirst({
      where: {
        userId: id,
        userAgent: agent,
      },
    });
    const token = _token?.token ?? '';
    return this.prismaService.token.upsert({
      where: { token },
      update: { token: v4(), exp: add(new Date(), { weeks: 1 }) },
      create: {
        token: v4(),
        exp: add(new Date(), { weeks: 1 }),
        userId: id,
        userAgent: agent,
      },
    });
  }

  public async generateJwtToken(
    user: IUserJWT,
    agent: string,
  ): Promise<IToken> {
    return await this.generateToken(user, agent);
  }

  public async refreshTokens(
    refreshToken: string,
    agent: string,
  ): Promise<IToken> {
    const token = await this.prismaService.token.delete({
      where: { token: refreshToken },
    });
    if (!token || new Date(token.exp) < new Date())
      throw new UnauthorizedException();

    const user = await this.usersService.getUserAllInfo(token.userId, true);
    return await this.generateToken(user, agent);
  }
}
