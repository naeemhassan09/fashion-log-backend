import { IsNotEmpty, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsOptional()
  phoneNumber: string;
}
