import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserResponse } from './responses';
import { AuthUserResponse } from '../auth/responses';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiTags('API')
  @ApiResponse({ status: 200, type: UpdateUserDTO })
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Patch('update-user')
  updateUser(
    @Body() userUpdateDTO: UpdateUserDTO,
    @Req() request,
  ): Promise<UpdateUserResponse> {
    const { id } = request.user;
    return this.usersService.updateUser(id, userUpdateDTO);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200, type: AuthUserResponse })
  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  getUserInfo(@Req() request): Promise<AuthUserResponse> {
    const { email } = request.user;
    return this.usersService.publicUser(email);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete('delete-user')
  deleteUser(@Req() request): Promise<void> {
    const { id } = request.user;
    return this.usersService.deleteUser(id);
  }
}
