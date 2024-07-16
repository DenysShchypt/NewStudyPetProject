import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class WatchListResponseGetOneAsset {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: string;
  @ApiProperty()
  @Expose()
  @IsNumber()
  user: string;
  @ApiProperty()
  @Expose()
  @IsString()
  name: string;
  @ApiProperty()
  @Expose()
  @IsString()
  createdAt: Date;
  @ApiProperty()
  @Expose()
  @IsString()
  updatedAt: Date;
  @ApiProperty()
  @Expose()
  @IsNumber()
  assetId: number;
}
@Exclude()
export class WatchListResponse {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: string;
  @ApiProperty()
  @Expose()
  @IsNumber()
  userId: string;
  @ApiProperty()
  @Expose()
  @IsString()
  name: string;
  @ApiProperty()
  @Expose()
  @IsNumber()
  assetId: number;
}
