import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { OptionalJwtAuthGuard } from './guards/optional-jwt-auth.guard';
import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { LoginDto } from './dtos/login.dto';
import { DiscordLoginQueryDto } from './dtos/discord-login-query.dto';
import { Auth } from './auth.decorator';
import JwtRefreshGuard from './guards/jwt-refresh.guard';

@Controller({ path: 'auth' })
@ApiTags('Auth API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login/discord')
  @Version(['1'])
  @UseGuards(OptionalJwtAuthGuard, DiscordAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Authenticate user using Discord',
    description: 'Endpoint for authenticating users using Discord.',
  })
  @ApiOkResponse({
    description:
      'User logged in successfully / Account linked successfully and access token and information is returned.',
    type: LoginDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid Discord token.' })
  @ApiNotFoundResponse({
    description: 'No user is linked to this Discord account.',
  })
  @ApiConflictResponse({
    description: 'Discord account already linked to an user.',
  })
  async postLoginDiscordV1(
    @Auth() user: Omit<User, 'passwordHash'>,
    @Query() _: DiscordLoginQueryDto,
  ) {
    return this.authService.login(user);
  }

  @Post('refresh')
  @Version(['1'])
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Refresh an access token',
    description: 'Endpoint for refreshing existing access tokens.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'User refresh token.',
    example: 'Refresh <token>',
  })
  @ApiOkResponse({
    description: 'A new access token is generated and returned.',
    type: LoginDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid refresh token.' })
  async postRefreshV1(@Auth() user: Omit<User, 'passwordHash'>) {
    return this.authService.login(user);
  }
}
