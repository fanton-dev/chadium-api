import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { CommunityService } from './community.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('communities')
@ApiTags('Community API')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all communities',
    description: 'Endpoint for getting all communities.',
  })
  @ApiOkResponse({
    description: 'Communities returned successfully.',
  })
  async getCommunity() {
    return this.communityService.getCommunity();
  }
}
