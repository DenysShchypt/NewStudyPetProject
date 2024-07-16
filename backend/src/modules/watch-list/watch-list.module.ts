import { Module } from '@nestjs/common';
import { WatchListController } from './watch-list.controller';
import { WatchListService } from './watch-list.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [WatchListController],
  providers: [WatchListService, PrismaService],
})
export class WatchListModule {}
