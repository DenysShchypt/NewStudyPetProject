import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import configurations from '../../configurations';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { WatchListModule } from '../watch-list/watch-list.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    UsersModule,
    AuthModule,
    TokenModule,
    WatchListModule,
  ],
})
export class AppModule {}
