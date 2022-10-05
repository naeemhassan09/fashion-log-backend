import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsOptional()
  phoneNumber: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Expose()
  @IsNotEmpty()
  password: string;
}
