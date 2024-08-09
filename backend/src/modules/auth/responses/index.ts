import { ApiProperty } from '@nestjs/swagger';
import { Provider, Role } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsString, IsEnum, IsNumber } from 'class-validator';
import { ITokenResponse } from '../../token/responses';
@Exclude()
export class UserResponse {
  @ApiProperty({ example: 'sdg5468gfh68f4dsh8642526' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'John' })
  @Expose()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Joshua' })
  @Expose()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: 'john@example.com' })
  @Expose()
  @IsString()
  email: string;

  @ApiProperty({ enum: Role, enumName: 'USER' })
  @IsEnum(Role, { each: true })
  roles: Role[];

  @ApiProperty({ example: 1 })
  @IsNumber()
  wallet: number;

  @ApiProperty({ enum: Provider, enumName: 'GOOGLE' })
  @IsEnum(Provider)
  provider?: Provider;

  @ApiProperty({ example: 'sdg5468gfh68f4dsh8642526' })
  @IsString()
  providerId?: string;

  @ApiProperty({ example: 'sdg5468gfh68f4dsh8642526' })
  @IsString()
  verifyLink?: string;

  // @ApiProperty({ example: '2024-07-08 18:26:46.855' })
  // @IsDate()
  // createAt: Date;

  // @ApiProperty({ example: '2024-08-08 18:26:46.855' })
  // @IsDate()
  // updateAt: Date;

  @ApiProperty({
    example:
      'https://lh3.googleusercontent.com/a/ACg8ocJ-OcEr6cr50Ak6Sz7LGMK6MXRH44O0ULhXbAtpn6lMa0OGlgQ=s96-c',
  })
  @IsString()
  picture?: string;
}

export class AuthUserResponse {
  @ApiProperty({ example: 'sdg5468gfh68f4dsh8642526' })
  @IsString()
  id: string;

  @ApiProperty({ example: 'John' })
  @Expose()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Joshua' })
  @Expose()
  @IsString()
  lastName?: string;

  @ApiProperty({ example: 'john@example.com' })
  @Expose()
  @IsString()
  email: string;

  @ApiProperty({ enum: Role, enumName: 'USER' })
  @IsEnum(Role, { each: true })
  roles: Role[];

  @ApiProperty({ example: 1 })
  @IsNumber()
  wallet: number;

  @ApiProperty({ type: ITokenResponse })
  token: ITokenResponse;
}
