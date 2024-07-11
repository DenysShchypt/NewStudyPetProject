import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {  IsString } from 'class-validator';
@Exclude()
export class UpdateUserResponse {
  @ApiProperty({ example: 'John' })
  @Expose()
  @IsString()
  firstName: string;
  @ApiProperty({ example: 'Joshua' })
  @Expose()
  @IsString()
  lastName: string;
  @ApiProperty({ example: 'john@example.com' })
  @Expose()
  @IsString()
  email: string;
}

// export class UserResponseInfo {
//   @ApiProperty({ example: 'sdg5468gfh68f4dsh8642526' })
//   @IsString()
//   id: string;

//   @ApiProperty({ example: 'John' })
//   @Expose()
//   @IsString()
//   firstName: string;

//   @ApiProperty({ example: 'Joshua' })
//   @Expose()
//   @IsString()
//   lastName: string;

//   @ApiProperty({ example: 'john@example.com' })
//   @Expose()
//   @IsString()
//   email: string;

//   @ApiProperty({ enum: Role, enumName: 'USER' })
//   @IsEnum(Role, { each: true })
//   roles: Role[];

//   @ApiProperty({ example: 1 })
//   @IsNumber()
//   wallet: number;
// }
