import 'dotenv/config';
import * as Sentry from '@sentry/node';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './AppModule';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  Sentry.init({ dsn: process.env.SENTRY_DSN });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(Sentry.Handlers.errorHandler());

  const options = new DocumentBuilder()
    .setTitle('Edgar Majordome')
    .setSchemes('https')
    .setDescription(
      'Personal assistant which helps you to manage your house(s)',
    )
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('_doc', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
