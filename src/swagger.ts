import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { SERVER, BASE_ROUTE } from './shared/constants';

export function setupSwagger(app: INestApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Pricing Engine Backend APIs')
    .setDescription('This is the API documentation for Pricing Engine')
    .setVersion('1.0')
    .addSecurity('Authorization', {
      type: 'apiKey',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter Authorization token',
      in: 'header',
    })
    .addServer(SERVER.DEV_SERVER, 'Dev')
    .addServer(SERVER.STAGE_SERVER, 'Stage')
    .addServer(SERVER.PROD_SERVER, 'Production')
    .addServer(SERVER.LOCAL, 'Local')
    .setVersion('1.0')
    .build();

  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
  };
  const swaggerDocCustomOptions: SwaggerCustomOptions = {
    customCss: `
    .swagger-ui .opblock .opblock-summary-description, .swagger-ui .code {
        color: #0d2974;
        font-family: system-ui !important;
        font-size: 16px;
        font-weight: 500 !important;
        text-align: right;
        padding: 10px
      }
    .swagger-ui code, 
    .swagger-ui textarea, 
    .swagger-ui .opblock-body pre.microlight, 
    .swagger-ui select, p, 
    .swagger-ui .parameter__name 
    {
        font-family: system-ui !important;
        font-weight: 400 !important;
        font-size: 13.5px;
        padding: 0 !important;
    }
    .swagger-ui .opblock-body pre.microlight {
      padding: 5px 5px 5px 10px !important;
    }
    .swagger-ui .renderedMarkdown code{
      background-color: transparent
    }
    .swagger-ui .opblock-description-wrapper {
      font-size: 13px !important;
    }
    .swagger-ui .response-col_status {
      vertical-align: middle;
    }
    .swagger-ui table tbody tr td {
      border-bottom: 1px solid rgba(59,65,81,.2);
      padding-bottom: 10px;
    }
    .swagger-ui select, .swagger-ui .responses-inner .curl {
      padding: 5px 40px 5px 10px !important;
    }
  `,
    explorer: true,
    validatorUrl: null,
    swaggerOptions: {
      persistAuthorization: true,
      filter: true,
      validatorUrl: null,
      defaultModelsExpandDepth: -1, // to hide all DTO schemas from Swagger
    },
    customSiteTitle: 'Pricing Engine API Documentation',
  };

  const document = SwaggerModule.createDocument(app, swaggerConfig, swaggerDocumentOptions);
  SwaggerModule.setup(`${BASE_ROUTE}api-docs`, app, document, swaggerDocCustomOptions);
}
