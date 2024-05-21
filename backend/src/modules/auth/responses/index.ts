import { IsString } from 'class-validator';

export class AuthUserResponse {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  token: string;
}
