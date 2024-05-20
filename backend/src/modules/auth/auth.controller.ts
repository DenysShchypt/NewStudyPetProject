import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { LoginUserDTO } from './dto';
import { AuthUserResponse } from './responses';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authService.registerUsers(dto);
  }
  @Post('login')
  loginUser(@Body() dto: LoginUserDTO): Promise<AuthUserResponse> {
    return this.authService.loginUsers(dto);
  }
}
