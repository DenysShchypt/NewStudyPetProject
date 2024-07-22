import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../modules/users/users.service';
import { IJwtPlayLoad } from '../interfaces/auth';
import { AppError } from '../common/constants/errors';
@Injectable()
// JwtStrategy наслідується від PassportStrategy і використовує стратегію JWT (Strategy).
// logger — Логер для запису повідомлень про помилки або інші важливі події.
// configService — Використовується для отримання конфігураційних налаштувань (наприклад, секретного ключа).
// userService — Сервіс для взаємодії з користувачами в базі даних.
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    //     jwtFromRequest — Визначає, звідки брати JWT у запиті (в даному випадку — з заголовка авторизації як Bearer Token).
    // ignoreExpiration — Визначає, чи слід ігнорувати закінчення терміну дії токена (в даному випадку — ні).
    // secretOrKey — Секретний ключ, який використовується для верифікації підпису токена
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('secret_jwt'),
    });
  }
  //   Перевірка токена: JwtStrategy витягує JWT з заголовка запиту і перевіряє його на дійсність, використовуючи секретний ключ.
  // Отримання користувача: Після верифікації токена, JwtStrategy витягує інформацію про користувача з бази даних.
  // Логування помилок: У випадку помилки при валідації, JwtStrategy логує цю помилку для подальшого аналізу.
  // Забезпечення безпеки: Якщо користувач не знайдений або токен недійсний, JwtStrategy кидає виняток UnauthorizedException, тим самим запобігаючи доступу до захищених ресурсів.
  async validate(payload: IJwtPlayLoad) {
    const user = await this.userService
      .getUserAllInfo(payload.user.id)
      .catch(error => {
        this.logger.error(`${AppError.ERROR_JWT}: ${error.message}`);
        // Повернення null, щоб сигналізувати про невдалу спробу отримання користувача
        return null;
      });
    if (!user) {
      throw new UnauthorizedException(AppError.USER_NOT_FOUND);
    }
    return { ...payload.user };
  }
}
