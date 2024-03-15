import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { CommunityService } from './community.service';

@Controller('communities')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCommunity() {
    return this.communityService.getCommunity();
  }
}
