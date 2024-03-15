import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { appConfig } from './app/app.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // API setup
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const { port } = appConfig;
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  // Start the API
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
