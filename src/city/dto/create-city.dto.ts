import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateCityDto {
  @MinLength(5)
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  state_id: number;
}
