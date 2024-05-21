import { Module } from '@nestjs/common';
import { WatchListController } from './watch-list.controller';
import { WatchListService } from './watch-list.service';

@Module({
  controllers: [WatchListController],
  providers: [WatchListService],
})
export class WatchListModule {}
