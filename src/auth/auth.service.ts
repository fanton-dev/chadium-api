import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { appConfig } from '../app/app.config';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userInformation: { email: string }) {
    const user = await this.userService.getByEmailOrThrow(
      userInformation.email,
    );
    const payload = {
      email: user.email,
      sub: user.id,
      name: user.name,
    };

    return {
      user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, appConfig.jwtRefreshToken),
      expiresIn: new Date().setTime(new Date().getTime() + 3600 * 24 * 1000),
    };
  }
}
