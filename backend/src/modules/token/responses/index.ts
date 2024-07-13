import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class IRefreshToken {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  @IsString()
  token: string;

  @ApiProperty({ example: '2024-07-11T23:59:59Z' })
  @IsDate()
  exp: Date;

  @ApiProperty({ example: '2a75219e-1d14-4497-ab63-b80d91e9410e' })
  @IsString()
  userId: string;

  @ApiProperty({
    example:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  })
  @IsString()
  userAgent: string;
}

export class ITokenResponse {
  @ApiProperty({ example: '2a75219e-1d14-4497-ab63-b80d91e9410e' })
  @IsString()
  token: string;
  @ApiProperty({ type: IRefreshToken })
  refreshToken: IRefreshToken;
}
