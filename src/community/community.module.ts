import { Module } from '@nestjs/common';
import { CommunityService } from "./community.service";
import { PrismaService } from "../prisma/prisma.service";
import { CommunityController } from "./community.controller";

@Module({
  imports: [],
  controllers: [CommunityController],
  providers: [CommunityService, PrismaService],
})
export class CommunityModule {}
