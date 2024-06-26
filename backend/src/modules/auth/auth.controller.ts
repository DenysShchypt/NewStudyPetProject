import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { LoginUserDTO } from './dto';
import { AuthUserResponse } from './responses';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiTags('API')
  @ApiResponse({ status: 201, type: AuthUserResponse })
  @Post('register')
  register(
    @Body() dto: CreateUserDTO,
  ): Promise<AuthUserResponse | BadRequestException> {
    return this.authService.registerUsers(dto);
  }
  @ApiTags('API')
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('login')
  loginUser(
    @Body() dto: LoginUserDTO,
  ): Promise<AuthUserResponse | BadRequestException> {
    return this.authService.loginUsers(dto);
  }
}
