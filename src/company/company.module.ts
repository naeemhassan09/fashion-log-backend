import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CompanyController],
  imports: [TypeOrmModule.forFeature([CompanyRepository])],
  providers: [CompanyService],
})
export class CompanyModule {}
