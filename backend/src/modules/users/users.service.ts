import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import validator from 'validator';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { Role } from '@prisma/client';
import { CreateUserDTO, UpdatePasswordDTO, UpdateUserDTO } from './dto';
import { UpdateUserResponse } from './responses';
import { AppError } from '../../common/constants/errors';
import { AuthUserResponse, UserResponse } from '../auth/responses';
import { TokenService } from '../token/token.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  USER_ALL_INFO,
  USER_SELECT_FIELDS,
} from '../../common/constants/select-return';
import { ConfigService } from '@nestjs/config';
import { convertToSecondsUtil } from '../../../libs/common/utils/convert-to-seconds.util';

@Injectable()
export class UsersService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async hashPassword(
    password: string | Buffer,
    salt: string,
  ): Promise<string> {
    return bcrypt.hashSync(password, salt);
  }
  private async isValidUuid(val: string): Promise<boolean> {
    return validator.isUUID(val);
  }
  public async getUserAllInfo(
    idOrEmail: string,
    isReset: boolean = false,
  ): Promise<UserResponse> {
    if (isReset) {
      await this.cacheManager.del(idOrEmail);
    }
    const user = await this.cacheManager.get<UserResponse>(idOrEmail);
    if (!user) {
      const userFromBD = await this.prismaService.user.findFirst({
        where: (await this.isValidUuid(idOrEmail))
          ? { id: idOrEmail }
          : { email: idOrEmail },
        select: (await this.isValidUuid(idOrEmail))
          ? USER_SELECT_FIELDS
          : USER_ALL_INFO,
      });
      if (!userFromBD) throw new BadRequestException(AppError.USER_NOT_FOUND);
      await this.cacheManager.set(
        idOrEmail,
        userFromBD,
        convertToSecondsUtil(this.configService.get('expire_jwt')),
      );
      return userFromBD;
    }
    return user;
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
