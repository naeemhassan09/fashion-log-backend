import { Injectable, Logger } from '@nestjs/common';
import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { constructErrorResponse, constructSuccessResponse } from '../core/wrappers';

@Injectable()
export class UserService {
  private logger = new Logger('USER SERVICE');

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async createUser(createUserDto: UserRegisterRequestDto) {
    try {
      const newUser = await this.userRepository.doUserRegistration(createUserDto);
      return constructSuccessResponse(newUser);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }
  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }
}
