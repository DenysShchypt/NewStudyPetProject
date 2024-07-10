import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto';
import { LoginUserDTO } from './dto';
import { AuthUserResponse } from './responses';
import { ConfigService } from '@nestjs/config';
import { UserAgent } from '../../../libs/common/decorators/user-agent.decorator';
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
  ): Promise<AuthUserResponse | BadRequestException> {
    return await this.authService.registerUsers(dto, agent);
  }
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @Post('login')
  loginUser(
    @Body() dto: LoginUserDTO,
  ): Promise<AuthUserResponse | BadRequestException> {
    return this.authService.loginUsers(dto);
  }
}
