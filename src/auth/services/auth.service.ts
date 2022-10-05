import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { MapperUtil, ROLE, UnAuthorizedException } from 'src/shared';
import { CreateUserDto, UserService, VerifyUserDto } from 'src/user';
import { UserDto } from 'src/user/dtos/user.dto';
import { AuthPayload, AuthTokenDto, JwtPayload, LoginDto } from '../dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {}

  async verifyUser(verifyUserDto: VerifyUserDto): Promise<AuthTokenDto> {
    const user = await this.userService.createAndGetUser(verifyUserDto);
    return this._generateAuthToken(MapperUtil.map(UserDto, user), ROLE.USER, user.phoneNumber);
  }

  async createUser(createUserDto: CreateUserDto): Promise<AuthTokenDto> {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    const user = await this.userService.createUser(createUserDto);
    return this._generateAuthToken(MapperUtil.map(UserDto, user), ROLE.USER, user.phoneNumber);
  }

  async authenticateUser(loginDto: LoginDto): Promise<AuthTokenDto> {
    const user = await this.userService.findByEmail(loginDto.username);
    await this._validateCredentials(loginDto, user);
    return this._generateAuthToken(MapperUtil.map(UserDto, user), ROLE.USER, user.phoneNumber);
  }

  getAuthToken(data: any, authPayload: AuthPayload): AuthTokenDto {
    const subject = { sub: authPayload.id };
    const payload: JwtPayload = MapperUtil.map(JwtPayload, authPayload);
    payload.sub = authPayload.id;

    const tokenExpiry = this._getJwtExpiryByRole(authPayload.roles[0]);

    const authToken: AuthTokenDto = {
      accessToken: this.jwtService.sign({ ...payload, ...subject }, { expiresIn: tokenExpiry.accessTokenExpiry }),
      authInfo: data,
    };
    return authToken;
  }

  private _generateAuthToken(data: any, role: ROLE, username: string): AuthTokenDto {
    const authPayload = MapperUtil.map(AuthPayload, data);
    authPayload.roles = [role];
    authPayload.username = username;
    return this.getAuthToken(data, authPayload);
  }

  private async _validateCredentials(loginDto: LoginDto, data: any): Promise<boolean> {
    if (!data) {
      throw new UnAuthorizedException('INVALID_CREDENTIALS');
    }

    const match = await this.comparePasswords(loginDto.password, data.password);
    if (!match) {
      throw new UnAuthorizedException('INVALID_CREDENTIALS');
    }
    return true;
  }

  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  comparePasswords(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  private _getJwtExpiryByRole(role: ROLE) {
    return {
      accessTokenExpiry: this.configService.get('jwt.accessTokenExpiresInSec'),
    };
  }
}
