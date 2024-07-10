import { ApiProperty } from '@nestjs/swagger';
import { Provider, Role } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsEnum, IsNumber, IsDate } from 'class-validator';
import { IToken } from '../../../interfaces/auth';
@Exclude()
export class UserResponse {
  @ApiProperty()
  @Expose()
  @IsString()
  id: string;

  @ApiProperty()
  @Expose()
  @IsString()
  firstName: string;

  @ApiProperty()
  @Expose()
  @IsString()
  lastName: string;

  @ApiProperty()
  @Expose()
  @IsString()
  email: string;

  @ApiProperty({ enum: Role, enumName: 'USER' })
  @IsEnum(Role, { each: true })
  roles: Role[];

  @ApiProperty({ enum: Provider, enumName: 'GOOGLE' })
  @Expose()
  @IsEnum(Provider)
  provider: Provider;

  @ApiProperty()
  @Expose()
  @IsString()
  providerId: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  wallet: number;

  @ApiProperty()
  @Expose()
  @IsDate()
  createAt: Date;

  @ApiProperty()
  @Expose()
  @IsDate()
  updateAt: Date;

  @ApiProperty()
  @Expose()
  @IsString()
  picture: string;
}

export class AuthUserResponse {
  @ApiProperty()
  user: UserResponse;
  @ApiProperty()
  @Expose()
  @IsString()
  token: IToken;
}
