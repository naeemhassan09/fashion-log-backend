import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Company } from './company.entity';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {
  private readonly logger = new Logger('COMPANY REPOSITORY');

  async createCompany(createCompanyDto: CreateCompanyDto) {
    console.log(
      '🚀 ~ file: company.repository.ts:13 ~ CompanyRepository ~ createCompany ~ createCompanyDto',
      createCompanyDto
    );

    const { name, type, email, deletedAt, createdBy, updatedBy, deletedBy, disabled } = createCompanyDto;
    const newCompany = this.create({
      name,
      type,
      email,
      deletedAt,
      createdBy,
      updatedBy,
      deletedBy,
      disabled,
    });

    this.logger.log(`creating new company  ${JSON.stringify(newCompany)}`);
    const company = await this.save(newCompany);
    return company;
  }

  async updateCompany(id: number, updateCompanyDto: UpdateCompanyDto) {
    const updateCompanyData = { id, ...updateCompanyDto };

    this.logger.log(`updating company id = ${id}`);
    const company = await this.update({ id: updateCompanyData.id }, { ...updateCompanyData });
    return company;
  }

  async findAllCompanies() {
    this.logger.log('find all cities');
    const companyList = await this.find();
    return companyList;
  }
  async findCompanyById(id: number) {
    this.logger.log(`finding company by id ${id}`);
    const company = await this.findOne(id);
    return company;
  }
  async deleteCompany(id: number) {
    this.logger.log(`deleting company by id ${id}`);
    await this.delete(id);
    return true;
  }
}
