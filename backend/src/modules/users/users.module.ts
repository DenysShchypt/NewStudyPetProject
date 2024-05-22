import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { WatchList } from '../watch-list/models/watchList.model';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [SequelizeModule.forFeature([User, WatchList]), TokenModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
