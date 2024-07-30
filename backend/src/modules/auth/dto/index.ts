import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

//Перевірка входящих даних
export class LoginUserDTO {
  // опис схеми для swagger виконується за допомогою @ApiProperty()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(10, 20)
  @Matches(/^.*$/, { message: 'Field must contain any characters' })
  password: string;
}

export class CreateGoogleUserDTO {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: 'GOOGLE', enum: Provider })
  @IsEnum(Provider)
  provider: Provider;
  @ApiProperty({ example: '46478642345867234548645' })
  @IsString()
  providerId: string;
  @ApiProperty({ example: 'Denys' })
  @IsString()
  firstName: string;
  @ApiProperty({ example: 'Developer' })
  @IsString()
  lastName: string;
  @ApiProperty({
    example:
      'https://lh3.googleusercontent.com/a/ACg8ocJ-OcEr6cr50Ak6Sz7LGMK6MXRH44O0ULhXbAtpn6lMa0OGlgQ=s96-c',
  })
  @IsString()
  picture: string;
}
