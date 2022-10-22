import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateFeatureDto {
  @MinLength(5)
  @IsNotEmpty()
  name: string;
}
