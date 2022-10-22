import { PartialType } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';
import { CreateFeatureDto } from './create-feature.dto';

export class UpdateFeatureDto extends PartialType(CreateFeatureDto) {
  @IsOptional()
  disabled: boolean;
}
