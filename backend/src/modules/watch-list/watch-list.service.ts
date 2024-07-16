import { BadRequestException, Injectable } from '@nestjs/common';
import { WatchListResponse, WatchListResponseGetOneAsset } from './responses';
import { WatchListDTO } from './dto';
import { AppError } from '../../common/constants/errors';
import { WatchList } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ICurrentUser } from '../../interfaces/auth';

@Injectable()
export class WatchListService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAsset(
    userId: string,
    dto: WatchListDTO,
  ): Promise<WatchListResponse> {
    const existingAsset = await this.prismaService.watchList.findFirst({
      where: { userId, assetId: dto.assetId },
    });
    if (existingAsset)
      throw new BadRequestException(AppError.ASSET_ALREADY_EXISTS);
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

  async getAsset(
    userId: string,
    id: string,
  ): Promise<WatchListResponseGetOneAsset> {
    try {
      const asset = await this.prismaService.watchList.findUnique({
        where: { userId, id },
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
  async getAllAssets(user: ICurrentUser): Promise<WatchList[]> {
    try {
      const watchList = await this.prismaService.watchList.findMany({
        where: { userId: user.id },
      });
      if (watchList.length === 0)
        throw new BadRequestException(AppError.ASSETS_NOT_FOUND);
      return watchList;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAsset(userId: string, id: string): Promise<void> {
    const asset = await this.prismaService.watchList.findUnique({
      where: { id, userId },
    });
    if (!asset) throw new BadRequestException(AppError.ASSET_NOT_FOUND);
    try {
      await this.prismaService.watchList.delete({
        where: { userId, id },
      });
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
}
