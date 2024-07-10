import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { CreateUserDTO, UpdatePasswordDTO, UpdateUserDTO } from './dto';
import { UpdateUserResponse } from './responses';
import { AppError } from '../../common/constants/errors';
import { AuthUserResponse, UserResponse } from '../auth/responses';
import { TokenService } from '../token/token.service';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { USER_SELECT_FIELDS } from '../../common/constants/select-return';

@Injectable()
export class UsersService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async hashPassword(
    password: string | Buffer,
    salt: string,
  ): Promise<string> {
    return bcrypt.hashSync(password, salt);
  }
  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { email },
        include: {
          model: WatchList,
          required: false,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async findById(id: number): Promise<User> {
    try {
      return await this.userRepository.findOne({
        where: { id },
        include: {
          model: WatchList,
          required: false,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  public async createUser(dto: CreateUserDTO): Promise<UserResponse> {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });
    if (user) return;
    const salt = await bcrypt.genSalt();
    dto.password = await this.hashPassword(dto.password, salt);
    const createNewUser = await this.prismaService.user.create({
      data: {
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: dto.password,
        passwordRepeat: dto.passwordRepeat,
        roles: [Role.USER],
      },
      select: USER_SELECT_FIELDS,
    });
    await this.cacheManager.set(createNewUser.id, createNewUser);
    await this.cacheManager.set(createNewUser.email, createNewUser);
    return createNewUser;
  }

  async publicUser(email: string): Promise<AuthUserResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
        include: {
          model: WatchList,
          required: false,
        },
      });
      const token = this.tokenService.generateJwtToken(user);
      return { user, token };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(
    id: string,
    dto: UpdateUserDTO,
  ): Promise<UpdateUserResponse> {
    const user = await this.userRepository.findByPk(id);
    if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);

    try {
      await this.userRepository.update(dto, {
        where: { id },
      });
      return plainToInstance(UpdateUserResponse, dto);
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUserPassword(id: number, dto: UpdatePasswordDTO): Promise<any> {
    const user = await this.userRepository.findByPk(id);
    if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);
    try {
      const { password } = await this.findById(id);
      const currentPassword = await bcrypt.compare(dto.password, password);
      if (!currentPassword) throw new BadRequestException(AppError.WRONG_DATA);

      const data = { password: await this.hashPassword(dto.newPassword) };
      return await this.userRepository.update(data, {
        where: { id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findByPk(id);
    if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);
    try {
      await this.userRepository.destroy({ where: { id } });
    } catch (error) {
      throw new Error(error);
    }
  }
}
