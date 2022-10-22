import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { State } from '../state/state.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

import { Country } from './country.entity';

@EntityRepository(Country)
export class CountryRepository extends Repository<Country> {
  private readonly logger = new Logger('COUNTRY REPOSITORY');

  async createCountry(createCountryDto: CreateCountryDto) {
    const { name = '', country_code, country_phone_digits } = createCountryDto;
    const newCountry = this.create({
      name,
      country_code,
      country_phone_digits,
    });

    this.logger.log('creating new country');
    const country = await this.save(newCountry);
    return country;
  }

  async updateCountry(id: number, updateCountryDto: UpdateCountryDto) {
    const updateCountryData = { id, ...updateCountryDto };

    this.logger.log(`updating country id = ${id}`);
    const country = await this.update({ id: updateCountryData.id }, { ...updateCountryData });
    return country;
  }

  async findAllCountries() {
    this.logger.log('find all countries');
    const countryList = await this.find();
    return countryList;
  }
  async findCountryById(id: number) {
    this.logger.log(`finding by id ${id}`);
    const country = await this.findOne(id);
    return country;
  }
  async deleteCountry(id: number) {
    this.logger.log(`deleting by id ${id}`);
    await this.delete(id);
    return true;
  }
}
