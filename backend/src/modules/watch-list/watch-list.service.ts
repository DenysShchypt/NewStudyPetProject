import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WatchList } from './models/watchList.model';
import { WatchListResponse, WatchListResponseGetOneAsset } from './responses';
import { WatchListDTO } from './dto';
import { AppError } from '../../common/constants/errors';

@Injectable()
export class WatchListService {
  constructor(
    @InjectModel(WatchList)
    private readonly watchListRepository: typeof WatchList,
  ) {}

  async createAsset(
    userId: number,
    dto: WatchListDTO,
  ): Promise<WatchListResponse> {
    try {
      const watchList = {
        user: userId,
        name: dto.name,
        assetId: dto.assetId,
      };
      await this.watchListRepository.create(watchList);
      return watchList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAsset(
    userId: number,
    assetId: string,
  ): Promise<WatchListResponseGetOneAsset> {
    try {
      const asset = await this.watchListRepository.findOne({
        where: { user: userId, id: assetId },
      });

      if (!asset) throw new BadRequestException(AppError.ASSET_NOT_FOUND);
      return {
        name: asset.name,
        assetId: asset.assetId,
        user: userId,
        id: asset.id,

        updatedAt: asset.updatedAt,
        createdAt: asset.createdAt,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllAssets(userId: number): Promise<WatchList[]> {
    try {
      const watchList = await this.watchListRepository.findAll({
        where: { user: userId },
      });
      if (watchList.length === 0)
        throw new BadRequestException(AppError.ASSETS_NOT_FOUND);
      return watchList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAsset(userId: number, assetId: string): Promise<void> {
    const asset = await this.watchListRepository.findByPk(assetId);
    if (!asset) throw new BadRequestException(AppError.ASSET_NOT_FOUND);
    try {
      await this.watchListRepository.destroy({
        where: { user: userId, id: assetId },
      });
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
}
