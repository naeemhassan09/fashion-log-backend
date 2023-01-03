import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import * as helmet from 'helmet';
import * as Sentry from '@sentry/node';
import { BASE_ROUTE } from './shared/constants';
import { CONSTANTS } from './app.constants';
import { AppModule } from './app.module';
import { RequestIdMiddleware } from './core';
import { setupLogger } from './logger';
import { ValidationFailedException } from './shared';
import { setupSwagger } from './swagger';
import sentryConfig from './core/config/sentry';
require('newrelic');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const SentryTracing = require('@sentry/tracing');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: setupLogger(),
  });

  Sentry.init({
    ...sentryConfig,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new SentryTracing.Integrations.Express({ app }),
      new SentryTracing.Integrations.Mysql(),
    ],
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  app.use(Sentry.Handlers.errorHandler());

  app.setGlobalPrefix(BASE_ROUTE);

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
  console.log('🚀 ~ file: main.ts:66 ~ bootstrap ~ port', port);
  await app.listen(port);
}
bootstrap();
