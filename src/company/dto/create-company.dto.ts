import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
export class CreateCompanyDto {
  @MinLength(5)
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  disabled: boolean;

  @IsNotEmpty()
  type: string;

  @IsEmail()
  email: string;

  @IsOptional()
  createdAt: Date;

  @IsOptional()
  updatedAt: Date;

  @IsOptional()
  deletedAt: Date;

  @IsOptional()
  createdBy: string;

  @IsOptional()
  updatedBy: string;

  @IsOptional()
  deletedBy: string;
}
