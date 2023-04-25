import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  app.useLogger(
    config.get('NODE_ENV') === 'development' ? ['debug'] : ['error', 'warn'],
  );
  const logger = app.get(Logger);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.set('trust proxy', 1);
  app.use(bodyParser.json({ limit: config.get('LIMIT') }));
  app.use(
    bodyParser.urlencoded({ limit: config.get('LIMIT'), extended: false }),
  );
  app.useStaticAssets(
    join(__dirname, config.get('STATIC_PATH') ?? '../static'),
    {
      prefix: config.get('static_prefix') ?? '/static/',
    },
  );
  app.enableCors({
    origin: true,
    credentials: true,
  });
  const options = new DocumentBuilder()
    .setTitle('Martkeplaces')
    .setDescription('Marketplaces backend service API docs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  const port = config.get('PORT');
  await app.listen(port, () => logger.log(`Server started on port : ${port}`));
}
bootstrap();
