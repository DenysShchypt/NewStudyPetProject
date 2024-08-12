import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import validator from 'validator';
import { ConfigService } from '@nestjs/config';
import * as bcryptjs from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { Role } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDTO, UpdatePasswordDTO, UpdateUserDTO } from './dto';
import { UpdateUserResponse } from './responses';
import { AppError } from '../../common/constants/errors';
import { UserResponse } from '../auth/responses';
import { PrismaService } from '../prisma/prisma.service';
import {
  USER_ALL_INFO,
  USER_SELECT_FIELDS,
} from '../../common/constants/select-return';
import { convertToSecondsUtil } from '../../../libs/common/utils/convert-to-seconds.util';
import { ICurrentUser } from '../../interfaces/auth';
import sendEmail from '../../../libs/helpers/nodemailer';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcryptjs.hashSync(password, salt);
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

    if (user && dto.providerId) {
      await this.cacheManager.set(user.id, user);
      await this.cacheManager.set(user.email, user);
      return user;
    }
    if (user) return;
    if (dto.password) {
      const salt = await bcryptjs.genSalt();
      dto.password = await this.hashPassword(dto.password, salt);
      dto.passwordRepeat = await this.hashPassword(dto.passwordRepeat, salt);
    }
    try {
      const createNewUser = await this.prismaService.user.create({
        data: {
          email: dto.email,
          firstName: dto.firstName,
          lastName: dto?.lastName,
          password: dto?.password,
          passwordRepeat: dto?.passwordRepeat,
          roles: [Role.USER],
          picture: dto?.picture,
          provider: dto?.provider,
          providerId: dto?.providerId,
          verifyLink: uuidv4(),
        },
        select: USER_SELECT_FIELDS,
      });
      const verifyEmail = {
        from: {
          name: 'PetProject',
          address: this.configService.get('mail_from'),
        },
        to: createNewUser.email,
        subject: 'Verify email',
        html: `<p><strong>Hello ${createNewUser.firstName} ${createNewUser.lastName}</strong>, you need to confirm your email<a target="_blank" href="${this.configService.get('base_url')}/auth/verify/${createNewUser.verifyLink}">Click verify here</a></p>`,
      };
      await sendEmail(verifyEmail);
      await this.cacheManager.set(createNewUser.id, createNewUser);
      await this.cacheManager.set(createNewUser.email, createNewUser);
      return createNewUser;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async updateUser(
    id: string,
    dto: UpdateUserDTO,
  ): Promise<UpdateUserResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);

    try {
      await this.prismaService.user.update({
        where: { id },
        data: {
          firstName: dto.firstName || user.firstName,
          lastName: dto.lastName || user.lastName,
          email: dto.email || user.email,
        },
      });
      return plainToInstance(UpdateUserResponse, dto);
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async updateUserPassword(id: string, dto: UpdatePasswordDTO): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);
    try {
      const { password } = await this.prismaService.user.findUnique({
        where: {
          id,
        },
      });
      const currentPassword = await bcryptjs.compare(dto.password, password);
      if (!currentPassword) throw new BadRequestException(AppError.WRONG_DATA);
      const salt = await bcryptjs.genSalt();
      const hashPassword = await this.hashPassword(dto.newPassword, salt);
      return await this.prismaService.user.update({
        where: { id },
        data: {
          password: hashPassword,
          passwordRepeat: hashPassword,
        },
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async deleteUser(id: string, currentUser: ICurrentUser): Promise<void> {
    if (currentUser.id !== id && !currentUser.roles.includes(Role.ADMIN))
      throw new BadRequestException(AppError.ADMIN_DELETE_USER);

    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) throw new BadRequestException(AppError.USER_NOT_EXIST);
    await this.cacheManager.del(id);
    try {
      await this.prismaService.user.delete({
        where: { id: user.id },
        select: { id: true },
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
