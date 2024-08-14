import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { LoginUserDTO } from './dto';
import { AuthUserResponse } from './responses';
import { ConfigService } from '@nestjs/config';
import { UserAgent } from '../../../libs/common/decorators/user-agent.decorator';
import { Response } from 'express';
import { ITokenAndUser } from '../../interfaces/auth';
import { Cookie } from '../../../libs/common/decorators/cookies.decorator';
import { OAuth2Client } from 'google-auth-library';
import { Provider } from '@prisma/client';

const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_SECRET,
);

const REFRESH_TOKEN = 'fresh';
@ApiTags('API')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @ApiResponse({ status: 201, type: AuthUserResponse })
  @Post('register')
  async register(
    @Body() dto: CreateUserDTO,
    @UserAgent() agent: string,
    @Res() res: Response,
  ): Promise<void> {
    const tokensAndUser = await this.authService.registerUsers(dto, agent);
    delete tokensAndUser.token.refreshToken;
    res.status(HttpStatus.OK).json({ ...tokensAndUser });
  }
  @ApiResponse({ status: 201, type: AuthUserResponse })
  @Get('verify/:token')
  async verificationToken(
    @Param('token') token: string,
    @UserAgent() agent: string,
    @Res() res: Response,
  ): Promise<void> {
    const tokensAndUser = await this.authService.verifyRegisterUser(
      token,
      agent,
    );
    this.setRefreshTokenToCookiesAfterVerify(tokensAndUser, res);
  }
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('login')
  async loginUser(
    @Body() dto: LoginUserDTO,
    @UserAgent() agent: string,
    @Res() res: Response,
  ): Promise<void> {
    const tokensAndUser = await this.authService.loginUsers(dto, agent);
    if (tokensAndUser.verifyLink === 'active') {
      this.setRefreshTokenToCookies(tokensAndUser, res);
    } else {
      delete tokensAndUser.token.refreshToken;
      res.status(HttpStatus.OK).json({ ...tokensAndUser });
    }
  }

  @ApiResponse({ status: 200 })
  @Get('logout')
  async logout(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ) {
    if (!refreshToken) {
      res.sendStatus(HttpStatus.OK);
      return;
    }
    await this.authService.deleteRefreshToken(refreshToken);
    //     httpOnly: true: Вказує, що cookie буде доступна тільки через HTTP(S), і її не можна отримати або змінити через JavaScript. Це забезпечує додаткову безпеку, захищаючи від атак XSS (Cross-Site Scripting).
    // secure: true: Вказує, що cookie буде передаватися тільки через HTTPS. Це забезпечує додаткову безпеку, запобігаючи передачі cookie через незашифровані HTTP-з'єднання.
    // expires: new Date(): Вказує, що cookie має негайно закінчити свою дію. Передача поточної дати та часу вказує, що cookie вже не дійсна, тому браузер видалить її.
    res.cookie(REFRESH_TOKEN, '', {
      httpOnly: true,
      secure:
        this.configService.get('NODE_ENV', 'development') === 'production',
      expires: new Date(),
      path: '/',
    });
    res.sendStatus(HttpStatus.OK);
  }
  @Get('refresh-tokens')
  async refreshTokens(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
    @UserAgent() agent: string,
  ) {
    console.log(refreshToken);
    if (!refreshToken) throw new UnauthorizedException();
    const newTokens = await this.authService.getRefreshTokens(
      refreshToken,
      agent,
    );
    this.setRefreshTokenToCookies(newTokens, res);
  }

  @Post('google')
  async googleAuth(
    @Body('token') token,
    @UserAgent() agent: string,
    @Res() res: Response,
  ): Promise<void> {
    const ticket = await oauth2Client.verifyIdToken({
      idToken: token,
      audience: this.configService.get('google_client_id'),
    });
    const payload = ticket.getPayload();
    const dateUser = {
      id: payload.sub,
      email: payload.email,
      lastName: payload.family_name,
      firstName: payload.given_name,
      picture: payload.picture,
      providerId: payload.sub,
      provider: Provider.GOOGLE,
    };
    const tokensAndUser = await this.authService.registerUsers(dateUser, agent);
    if (tokensAndUser.verifyLink === 'active') {
      this.setRefreshTokenToCookies(tokensAndUser, res);
    } else {
      res.status(HttpStatus.OK).json({ ...tokensAndUser });
    }
  }

  public setRefreshTokenToCookiesAfterVerify(
    tokensAndUser: ITokenAndUser,
    res: Response,
  ) {
    if (!tokensAndUser) throw new UnauthorizedException();

    res.cookie(
      REFRESH_TOKEN,
      tokensAndUser.token.refreshToken.token, // Значення рефреш-токена
      {
        httpOnly: true, // Кука доступна тільки через HTTP, і не доступна через JavaScript
        sameSite: 'lax', // Захист від CSRF атак, дозволяє куки відправляти з того ж самого або частково того ж сайту
        expires: new Date(tokensAndUser.token.refreshToken.exp), // Дата закінчення дії куки
        secure:
          this.configService.get('NODE_ENV', 'development') === 'production', // Кука буде передаватись тільки по HTTPS, якщо середовище - production
        path: '/', // Шлях, де кука буде доступна
      },
    );

    res.redirect(this.configService.get('base_url_client'));
  }
  public setRefreshTokenToCookies(tokensAndUser: ITokenAndUser, res: Response) {
    if (!tokensAndUser) throw new UnauthorizedException();

    res.cookie(
      REFRESH_TOKEN,
      tokensAndUser.token.refreshToken.token, // Значення рефреш-токена
      {
        httpOnly: true, // Кука доступна тільки через HTTP, і не доступна через JavaScript
        sameSite: 'lax', // Захист від CSRF атак, дозволяє куки відправляти з того ж самого або частково того ж сайту
        expires: new Date(tokensAndUser.token.refreshToken.exp), // Дата закінчення дії куки
        secure:
          this.configService.get('NODE_ENV', 'development') === 'production', // Кука буде передаватись тільки по HTTPS, якщо середовище - production
        path: '/', // Шлях, де кука буде доступна
      },
    );
    res.status(HttpStatus.OK).json({ ...tokensAndUser });
  }
}
