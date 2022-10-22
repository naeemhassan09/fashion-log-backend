import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateStateDto {
  @MinLength(5)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  country_id: number;
}
