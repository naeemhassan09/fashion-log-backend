import { Injectable } from '@nestjs/common';
import { MapperUtil, NotFoundException } from '../../../src/shared';
import { CreateUserDto, VerifyUserDto } from '../dtos';
import { User } from '../entities';
import { UserRepository } from '../repositories';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createAndGetUser(verifyUserDto: VerifyUserDto): Promise<User> {
    let user = await this.findByPhoneNumber(verifyUserDto.phoneNumber);

    if (!user) {
      user = new User();
      user.name = verifyUserDto.name;
      user.phoneNumber = verifyUserDto.phoneNumber;
      return await this.userRepository.save(user);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = MapperUtil.map(User, createUserDto);
    return await this.userRepository.save(user);
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User> {
    return await this.userRepository.findOne({ phoneNumber });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('ENTITY_NOT_FOUND', { field: User.name, id: id });
    }
    return user;
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
