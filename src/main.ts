import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { appConfig } from './app/app.config';
import { Logger } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  // API setup
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  const { port } = appConfig;
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  // OpenAPI setup
  const config = new DocumentBuilder()
    .setTitle('chadium-api')
    .setDescription(
      'Chadium is a platform that facilitates the management of small communities and improves their internal communication.',
    )
    .setLicense(
      'License',
      'https://github.com/fss-fmi/fmicodes/blob/main/LICENSE',
    )
    .setExternalDoc(
      'Developer Wiki',
      'https://github.com/fss-fmi/fmicodes/wiki',
    )
    .addBearerAuth({
      type: 'http',
      in: 'header',
      name: 'Authorization',
      description: 'Authorization bearer token',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
    })
    .addGlobalParameters({
      in: 'header',
      required: false,
      name: 'Authorization',
      schema: {
        type: 'string',
        examples: ['Bearer <token>'],
      },
    })
    .addGlobalParameters({
      in: 'cookie',
      required: false,
      name: 'access_token',
      schema: {
        type: 'string',
        examples: ['Bearer <token>'],
      },
    })
    .build();
  const options: SwaggerDocumentOptions = {};
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup(globalPrefix, app, document);

  // Start the API
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
