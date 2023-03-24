import { PartialType } from '@nestjs/swagger';
import { UserRegisterRequestDto } from './user-register.req.dto';

export class UpdateUserDto extends PartialType(UserRegisterRequestDto) {}
