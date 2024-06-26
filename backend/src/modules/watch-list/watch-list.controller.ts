import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchListService } from './watch-list.service';
import { WatchListDTO } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WatchListResponse, WatchListResponseGetOneAsset } from './responses';
import { WatchList } from './models/watchList.model';

@Controller('watch-list')
export class WatchListController {
  constructor(private readonly watchListService: WatchListService) {}
  @ApiTags('API')
  @ApiResponse({ status: 201, type: WatchListResponse })
  @UseGuards(JwtAuthGuard)
  @Post('create-asset')
  createAsset(
    @Body() assetDto: WatchListDTO,
    @Req() request,
  ): Promise<WatchListResponse> {
    const { id } = request.user;
    return this.watchListService.createAsset(id, assetDto);
  }
  @ApiTags('API')
  @ApiResponse({ status: 200, type: [WatchListResponseGetOneAsset] })
  @UseGuards(JwtAuthGuard)
  @Get('getAll-assets')
  getAllAssets(@Req() request): Promise<WatchList[]> {
    const { id } = request.user;
    return this.watchListService.getAllAssets(id);
  }
  @ApiTags('API')
  @ApiResponse({ status: 200, type: WatchListResponseGetOneAsset })
  @UseGuards(JwtAuthGuard)
  @Get('getOne-asset')
  getOneAsset(
    @Query('id') assetId: string,
    @Req() request,
  ): Promise<WatchListResponseGetOneAsset> {
    const { id } = request.user;
    return this.watchListService.getAsset(id, assetId);
  }
  @ApiTags('API')
  @ApiResponse({ status: 200 })
  @UseGuards(JwtAuthGuard)
  @Delete('delete-asset')
  deleteAsset(@Query('id') assetId: string, @Req() request): Promise<void> {
    const { id } = request.user;
    return this.watchListService.deleteAsset(id, assetId);
  }
}
