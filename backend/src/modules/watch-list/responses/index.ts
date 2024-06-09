import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class WatchListResponseGetOneAsset {
  @ApiProperty()
  @Expose()
  @IsNumber()
  id: number;
  @ApiProperty()
  @Expose()
  @IsNumber()
  user: number;
  @ApiProperty()
  @Expose()
  @IsString()
  name: string;
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
  user: number;
  @ApiProperty()
  @Expose()
  @IsString()
  name: string;
  @ApiProperty()
  @Expose()
  @IsNumber()
  assetId: number;
}
