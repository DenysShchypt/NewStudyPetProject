import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class UserResponse {
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsString()
  email: string;
}
export class AuthUserResponse {
  @ApiProperty()
  user: UserResponse;
  @ApiProperty()
  @IsString()
  token: string;
}
