import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  ApiSecurity,
  ApiUnauthorizedResponse,
  ApiBadGatewayResponse,
  ApiServiceUnavailableResponse,
} from '@nestjs/swagger';

import { ApiUnauthorizedResponseDto, SwaggerExceptionResponseDto } from '../dto';

export const SwaggerController = apiController => {
  return applyDecorators(
    ApiTags(apiController),
    ApiSecurity('Authorization'),
    ApiUnauthorizedResponse({
      type: ApiUnauthorizedResponseDto,
    }),
    ApiBadGatewayResponse({
      type: SwaggerExceptionResponseDto,
      description: 'Expected in response from other services e.g. Monolith or User Service',
    }),
    ApiServiceUnavailableResponse({ type: SwaggerExceptionResponseDto })
  );
};
