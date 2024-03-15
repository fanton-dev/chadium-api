import { CommunityModule } from '../community/community.module';
import { Module } from '@nestjs/common';
import AuthModule from '../auth/auth.module';
import { TasksModule } from '../tasks/tasks.module';
import { CrowdsourcingModule } from '../crowdsourcing/crowdsourcing.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [
    AuthModule,
    CommunityModule,
    TasksModule,
    CrowdsourcingModule,
    AiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

export default AppModule;
