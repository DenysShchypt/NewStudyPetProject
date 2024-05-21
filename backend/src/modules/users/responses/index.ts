import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
@Exclude()
export class UpdateUserResponse {
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
}
