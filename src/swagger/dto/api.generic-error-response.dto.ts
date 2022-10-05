/* istanbul ignore file */

export class SwaggerExceptionResponseDto {
  message: string;
  data: unknown;
  error?: unknown;
  success = false;
  stackTrace?: string;
}
