import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { appConfig } from '../../app/app.config';
import { JwtContentsDto } from '../dtos/jwt-contents.dto';
import { UserService } from '../../user/user.service';

type CookieExtractorRequest = Request & {
  cookies: {
    access_token: string;
  };
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    const cookieExtractor = (req: CookieExtractorRequest) => {
      let token = null;
      if (req && req.cookies) token = req.cookies.access_token;
      return token;
    };

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('access_token'),
        cookieExtractor,
      ]),
      ignoreExpiration: false,
      secretOrKey: appConfig.jwtAccessToken.secret,
    });
  }

  async validate(payload: JwtContentsDto) {
    return this.userService.getByEmail(payload.email);
  }
}
