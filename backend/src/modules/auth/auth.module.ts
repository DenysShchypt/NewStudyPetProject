import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { TokenModule } from '../token/token.module';
import { STRTAGIES } from '../../strategy';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [UsersModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, ...STRTAGIES, PrismaService],
})
export class AuthModule {}
