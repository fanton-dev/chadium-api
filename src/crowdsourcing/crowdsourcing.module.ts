import { Module } from '@nestjs/common';
import { CrowdsourcingController } from './crowdsourcing.controller';
import { CrowdsourcingService } from './crowdsourcing.service';

@Module({
  controllers: [CrowdsourcingController],
  providers: [CrowdsourcingService]
})
export class CrowdsourcingModule {}
