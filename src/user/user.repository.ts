import { UserRegisterRequestDto } from './dto/user-register.req.dto';
import { User } from './user.entity';
import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private readonly logger = new Logger('USER REPOSITORY');

  async doUserRegistration(userRegister: UserRegisterRequestDto): Promise<User> {
    const user = new User();
    user.first_name = userRegister.name;
    user.email = userRegister.email;
    user.password = userRegister.password;
    user.phone = userRegister.phone;
    this.logger.log('creating new user');

    return await this.save(user);
  }
}
