import { BadRequestException, Injectable } from '@nestjs/common';
import { WatchListResponse, WatchListResponseGetOneAsset } from './responses';
import { WatchListDTO } from './dto';
import { AppError } from '../../common/constants/errors';
import { WatchList } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WatchListService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAsset(
    userId: string,
    dto: WatchListDTO,
  ): Promise<WatchListResponse> {
    try {
      const newAsset = await this.prismaService.watchList.create({
        data: {
          userId: userId,
          name: dto.name,
          assetId: dto.assetId,
        },
      });
      return newAsset;
    } catch (error) {
      throw new Error(error);
    }
  }

  // async getAsset(
  //   userId: number,
  //   assetId: string,
  // ): Promise<WatchListResponseGetOneAsset> {
  //   try {
  //     const asset = await this.prismaService.watchList.findOne({
  //       where: { user: userId, id: assetId },
  //     });

  //     if (!asset) throw new BadRequestException(AppError.ASSET_NOT_FOUND);
  //     return {
  //       name: asset.name,
  //       assetId: asset.assetId,
  //       user: userId,
  //       id: asset.id,

  //       updatedAt: asset.updatedAt,
  //       createdAt: asset.createdAt,
  //     };
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
  // async getAllAssets(userId: number): Promise<WatchList[]> {
  //   try {
  //     const watchList = await this.prismaService.watchList.findAll({
  //       where: { user: userId },
  //     });
  //     if (watchList.length === 0)
  //       throw new BadRequestException(AppError.ASSETS_NOT_FOUND);
  //     return watchList;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // async deleteAsset(userId: number, assetId: string): Promise<void> {
  //   const asset = await this.prismaService.watchList.findByPk(assetId);
  //   if (!asset) throw new BadRequestException(AppError.ASSET_NOT_FOUND);
  //   try {
  //     await this.prismaService.watchList.destroy({
  //       where: { user: userId, id: assetId },
  //     });
  //     return;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}
