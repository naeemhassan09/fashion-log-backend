import { PartialType } from '@nestjs/mapped-types';
import { CreateStateDto } from './create-state.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateStateDto extends PartialType(CreateStateDto) {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  id: number;
}
