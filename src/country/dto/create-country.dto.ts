import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateCountryDto {
  @MinLength(5)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  country_code: number;

  @IsOptional()
  country_phone_digits: string;
}
