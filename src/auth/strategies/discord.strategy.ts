import { Profile, Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { appConfig } from '../../app/app.config';
import { UserService } from '../../user/user.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      ...appConfig.discord,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request & { user: Omit<User, 'passwordHash'> },
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    const user = await this.userService.getByDiscordId(profile.id);

    if (!user) {
      await this.userService.create({
        discordId: profile.id,
        email: profile.email,
      });
    }

    return this.userService.getByDiscordId(profile.id);
  }
}
