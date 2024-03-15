import { CommunityModule } from '../community/community.module';
import { Module } from '@nestjs/common';
import AuthModule from '../auth/auth.module';

@Module({
  imports: [AuthModule, CommunityModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

export default AppModule;
