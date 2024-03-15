import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
  Version,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Auth } from '../auth/auth.decorator';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  @Version(['1'])
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Current user information',
    description: 'Endpoint for gathering current user information.',
  })
  @ApiOkResponse({
    description: 'The user is authenticated and user information is returned.',
  })
  @ApiUnauthorizedResponse({ description: 'Invalid authentication token.' })
  getCurrentV1(@Auth() user: Omit<User, 'passwordHash'>) {
    return this.userService.getById(user.id);
  }
}
