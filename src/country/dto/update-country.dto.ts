import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { CreateCountryDto } from './create-country.dto';

export class UpdateCountryDto extends PartialType(CreateCountryDto) {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  id: number;
}
