import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Community } from '@prisma/client';
import { CommunityCreateDto } from './dtos/community-create.dto';
import { CommunityUpdateDto } from './dtos/community-update.dto';

@Injectable()
export class CommunityService {
  constructor(private readonly prismaService: PrismaService) {}

  // Create a new community
  async createCommunity(dto: CommunityCreateDto): Promise<Community> {
    return this.prismaService.community.create({
      data: {
        name: dto.name,
        description: dto.description,
        color: dto.color,
        ownerId: '0',
      },
    });
  }

  // Get all communities
  async getAllCommunities(): Promise<Community[]> {
    return this.prismaService.community.findMany();
  }

  // Get a single community by ID
  async getCommunityById(id: number): Promise<Community | null> {
    return this.prismaService.community.findUnique({
      where: { id },
    });
  }

  // Update a community by ID
  async updateCommunity(
    id: number,
    dto: CommunityUpdateDto,
  ): Promise<Community> {
    return this.prismaService.community.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  // Delete a community by ID
  async deleteCommunity(id: number): Promise<Community> {
    return this.prismaService.community.delete({
      where: { id },
    });
  }
}
