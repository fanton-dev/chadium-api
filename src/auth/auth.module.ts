import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { appConfig } from '../app/app.config';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { DiscordStrategy } from './strategies/discord.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register(appConfig.jwtAccessToken),
  ],
  providers: [AuthService, AnonymousStrategy, DiscordStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

export default AuthModule;
