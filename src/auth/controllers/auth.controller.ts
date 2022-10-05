import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../core';
import { ApiResponseDto } from '../../shared';
import { CreateUserDto } from '../../user';
import { AuthTokenDto, LoginDto } from '../dtos';
import { AuthService } from '../services';

@ApiTags('User Auth')
@Public()
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async userSignup(@Body() createUserDto: CreateUserDto): Promise<ApiResponseDto<AuthTokenDto>> {
    const authToken: AuthTokenDto = await this.authService.createUser(createUserDto);
    return { data: authToken };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async userLogin(@Body() loginDto: LoginDto): Promise<ApiResponseDto<AuthTokenDto>> {
    const authToken: AuthTokenDto = await this.authService.authenticateUser(loginDto);
    return { data: authToken };
  }
}
