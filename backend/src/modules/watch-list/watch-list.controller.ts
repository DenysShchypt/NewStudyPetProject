import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import { WatchListDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WatchListResponse, WatchListResponseGetOneAsset } from './responses';
import { WatchList } from '@prisma/client';
import { CurrentUser } from '../../../libs/common/decorators/current-use.decorator';
import { ICurrentUser } from '../../interfaces/auth';

@ApiTags('API')
@UseGuards(JwtAuthGuard)
@Controller('watch-list')
export class WatchListController {
  constructor(private readonly watchListService: WatchListService) {}

  @ApiResponse({ status: 201, type: WatchListResponse })
  @Post('create-asset')
  async createAsset(
    @Body() assetDto: WatchListDTO,
    @CurrentUser() user: ICurrentUser,
  ): Promise<WatchListResponse> {
    return await this.watchListService.createAsset(user.id, assetDto);
  }

  @ApiResponse({ status: 200, type: [WatchListResponseGetOneAsset] })
  @Get('getAll-assets')
  async getAllAssets(@CurrentUser() user: ICurrentUser): Promise<WatchList[]> {
    return await this.watchListService.getAllAssets(user);
  }
  @ApiResponse({ status: 200, type: WatchListResponseGetOneAsset })
  @Get('getOne-asset')
  async getOneAsset(
    @Query('id') assetId: string,
    @CurrentUser() user: ICurrentUser,
  ): Promise<WatchListResponseGetOneAsset> {
    return await this.watchListService.getAsset(user.id, assetId);
  }

  @ApiResponse({ status: 200 })
  @Delete('delete-asset')
  async deleteAsset(
    @Query('id') assetId: string,
    @CurrentUser() user: ICurrentUser,
  ): Promise<void> {
    return await this.watchListService.deleteAsset(user.id, assetId);
  }
}
