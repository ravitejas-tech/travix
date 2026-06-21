import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { configureNestJsTypebox } from '@travix/crud';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { Logger } from 'nestjs-pino';
import { ApiModule } from './api.module';
import { setupSwagger } from './utils/setup-swagger';

configureNestJsTypebox({
  patchSwagger: true,
  setFormats: true,
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ApiModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);
  const logger = app.get(Logger);
  app.useLogger(logger);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    maxAge: 86400,
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Access-Token',
    ],
  });
  app.enableShutdownHooks();
  app.set('trust proxy', true);
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));
  app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          upgradeInsecureRequests: null,
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
      crossOriginOpenerPolicy: false,
    }),
  );
  app.enableVersioning({ type: VersioningType.URI });

  setupSwagger(app);

  const HOST = configService.get('HOST', '0.0.0.0');
  const PORT = +configService.get('PORT', '3000');
  const browseHost = HOST === '0.0.0.0' ? 'localhost' : HOST;
  await app.listen(PORT, HOST, () => {
    logger.log(`API listening on http://${browseHost}:${PORT}`);
    logger.log(`Swagger: http://${browseHost}:${PORT}/openapi`);
  });
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
