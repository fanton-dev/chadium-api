import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityCreateDto } from './dtos/community-create.dto';
import { CommunityUpdateDto } from './dtos/community-update.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('communities')
@ApiTags('Communities')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new community' })
  @ApiBody({ type: CommunityCreateDto })
  @ApiCreatedResponse({
    description: 'Community created.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Community created.',
  })
  async createCommunity(@Body() dto: CommunityCreateDto) {
    return await this.communityService.createCommunity(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all communities' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Communities returned successfully.',
  })
  async getAllCommunities() {
    return await this.communityService.getAllCommunities();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a community by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Community returned successfully.',
  })
  async getCommunityById(@Param('id') id: number) {
    return await this.communityService.getCommunityById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a community by ID' })
  @ApiBody({ type: CommunityUpdateDto })
  @ApiCreatedResponse({
    description: 'Community updated.',
    type: CommunityUpdateDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Community updated successfully.',
  })
  async updateCommunity(
    @Param('id') id: number,
    @Body() dto: CommunityUpdateDto,
  ) {
    return await this.communityService.updateCommunity(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a community by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Community deleted successfully.',
  })
  async deleteCommunity(@Param('id') id: number) {
    return await this.communityService.deleteCommunity(id);
  }
}
