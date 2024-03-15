import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CommunityService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}

  getCommunity() {
    return this.prismaService.community.findMany();
  }
}
