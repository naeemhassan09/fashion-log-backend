import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCityDto extends PartialType(CreateCityDto) {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  id: number;
}
