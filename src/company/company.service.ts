import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyRepository)
    private readonly companyRepository: CompanyRepository
  ) {}
  create(createCompanyDto: CreateCompanyDto) {
    return this.companyRepository.createCompany(createCompanyDto);
  }

  findAll() {
    return this.companyRepository.findAllCompanies();
  }

  findOne(id: number) {
    return this.companyRepository.findOne(id);
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.companyRepository.updateCompany(id, updateCompanyDto);
  }

  remove(id: number) {
    return this.companyRepository.deleteCompany(id);
  }
}
