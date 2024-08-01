import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdatePasswordDTO, UpdateUserDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserResponse } from './responses';
import { UserResponse } from '../auth/responses';
import { CurrentUser } from '../../../libs/common/decorators/current-use.decorator';
import { ICurrentUser } from '../../interfaces/auth';
import { RolesGuard } from '../../guards/roles-guard';
import { Roles } from '../../../libs/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
@ApiTags('API')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 200, type: UpdateUserDTO })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Patch('update-user')
  public async updateUser(
    @Body() userUpdateDTO: UpdateUserDTO,
    @Req() request,
  ): Promise<UpdateUserResponse> {
    const { id } = request.user;
    return await this.usersService.updateUser(id, userUpdateDTO);
  }
  @ApiResponse({ status: 200 })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Patch('update-user-password')
  public async updateUserPassword(
    @Body() UpdatePasswordDTO: UpdatePasswordDTO,
    @Req() request,
  ): Promise<any> {
    const { id } = request.user;
    return await this.usersService.updateUserPassword(id, UpdatePasswordDTO);
  }

  @ApiResponse({ status: 200, type: UserResponse })
  @Get('user-info')
  public async getUserInfo(
    @CurrentUser() user: ICurrentUser,
  ): Promise<UserResponse> {
    const { id } = user;
    return await this.usersService.getUserAllInfo(id);
  }

  // example for use role
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  me(@CurrentUser() user: ICurrentUser) {
    return user;
  }

  @ApiResponse({ status: 200 })
  @Delete('delete-user/:id')
  public async deleteUser(
    @Param('id') id: string,
    @CurrentUser() user: ICurrentUser,
  ): Promise<void> {
    return await this.usersService.deleteUser(id, user);
  }
}
