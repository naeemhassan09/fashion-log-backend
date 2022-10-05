/* istanbul ignore file */

export class ApiUnauthorizedResponseDto {
  code = 'E_UNAUTHORIZED';
  message = 'Role is not allowed to access this resource';
  userMessage = 'You are not authorized to perform this operation';
  data: object;
  success = false;
}
