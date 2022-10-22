import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { constructErrorResponse, constructSuccessResponse } from '../core/wrappers';
import { CountryRepository } from './country.repository';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountryService {
  private logger = new Logger('COUNTRY SERVICE');

  constructor(
    @InjectRepository(CountryRepository)
    private readonly countryRepository: CountryRepository
  ) {}

  async createCountry(createCountryDto: CreateCountryDto) {
    try {
      const newCountry = await this.countryRepository.createCountry(createCountryDto);
      return constructSuccessResponse(newCountry);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async findAllCounties() {
    try {
      const data = await this.countryRepository.findAllCountries();
      return constructSuccessResponse(data);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async findCountryById(id: number) {
    try {
      const data = await this.countryRepository.findCountryById(id);
      if (!data) return constructErrorResponse({ status: HttpStatus.NOT_FOUND });
      return constructSuccessResponse(data);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async updateCountry(id: number, updateCountryDto: UpdateCountryDto) {
    try {
      const data = await this.countryRepository.updateCountry(id, updateCountryDto);
      return constructSuccessResponse(data);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async removeCountry(id: number) {
    try {
      const data = await this.countryRepository.deleteCountry(id);
      return constructSuccessResponse(data);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }
}
