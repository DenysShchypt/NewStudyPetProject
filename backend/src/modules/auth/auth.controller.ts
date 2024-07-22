import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { GoogleUserDTO, LoginUserDTO } from './dto';
import { AuthUserResponse } from './responses';
import { ConfigService } from '@nestjs/config';
import { UserAgent } from '../../../libs/common/decorators/user-agent.decorator';
import { Response, Request } from 'express';
import { ITokenAndUser } from '../../interfaces/auth';
import { Cookie } from '../../../libs/common/decorators/cookies.decorator';
import { GoogleGuard } from '../../guards/google-guard';

const REFRESH_TOKEN = 'fresh';
@ApiTags('API')
@Controller('auth')
export class AuthController {
  private readonly REFRESH_TOKEN_COOKIE: string;
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
    this.setRefreshTokenToCookies(tokensAndUser, res);
  }
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('login')
  async loginUser(
    @Body() dto: LoginUserDTO,
    @UserAgent() agent: string,
    @Res() res: Response,
  ): Promise<void> {
    const tokensAndUser = await this.authService.loginUsers(dto, agent);
    this.setRefreshTokenToCookies(tokensAndUser, res);
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
    res.cookie(this.REFRESH_TOKEN_COOKIE, '', {
      httpOnly: true,
      secure: true,
      expires: new Date(),
    });
    res.sendStatus(HttpStatus.OK);
  }
  @Get('refresh-tokens')
  async refreshTokens(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
    @UserAgent() agent: string,
  ) {
    if (!refreshToken) throw new UnauthorizedException();
    const newTokens = await this.authService.getRefreshTokens(
      refreshToken,
      agent,
    );
    this.setRefreshTokenToCookies(newTokens, res);
  }
  @UseGuards(GoogleGuard)
  @Get('google')
  async googleAuth(@Body('token') token: string, @Res() res: Response) {
    // Обробіть токен, отриманий від Google
    // Успішна відповідь
    return res.status(HttpStatus.OK).json({ message: 'Token received', token });
  }

  @UseGuards(GoogleGuard)
  @Get('google/callback')
  async googleAuthRedirect(
    @Req() req: Request,
    @Res() res: Response,
    @UserAgent() agent: string,
  ) {
    console.log(req.user);
    // const token = await this.authService.enterGoogleAuth(
    //   req.user as GoogleUserDTO,
    //   agent,
    // );
    // this.setRefreshTokenToCookies(token, res);
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
    res.status(HttpStatus.CREATED).json({ ...tokensAndUser });
  }
}
