import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

@Module({
  providers: [UserService, PrismaService, JwtStrategy],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
