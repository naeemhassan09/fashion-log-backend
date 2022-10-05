import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import * as helmet from 'helmet';
import { CONSTANTS } from './app.constants';
import { AppModule } from './app.module';
import { RequestIdMiddleware } from './core';
import { setupLogger } from './logger';
import { ValidationFailedException } from './shared';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: setupLogger(),
  });

  app.setGlobalPrefix(CONSTANTS.API_VERSION);

  const configService = app.get(ConfigService);
  const environment = configService.get<string>('NODE_ENV');

  if (environment === CONSTANTS.ENVIRONMENT.PRODUCTION) {
    app.use(helmet());
  }

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  app.use(RequestIdMiddleware);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new ValidationFailedException(validationErrors);
      },
    })
  );
  /** Swagger configuration */
  setupSwagger(app);

  const port = configService.get<number>('port');
  await app.listen(port);
}
bootstrap();
