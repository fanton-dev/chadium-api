import { CommunityModule } from "../community/community.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    CommunityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

export default AppModule;
