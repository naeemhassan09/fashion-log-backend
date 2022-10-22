import { HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityRepository } from '../city/city.repository';
import { constructErrorResponse, constructSuccessResponse } from '../core/wrappers';
import { CountryRepository } from '../country/country.repository';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { StateRepository } from './state.repository';

@Injectable()
export class StateService {
  private logger = new Logger('COUNTRY SERVICE');

  constructor(
    @InjectRepository(CountryRepository)
    private readonly countryRepository: CountryRepository,
    @InjectRepository(StateRepository)
    private readonly stateRepository: StateRepository
  ) {}

  async createState(createStateDto: CreateStateDto) {
    try {
      const myCountry = await this.countryRepository.findCountryById(createStateDto.country_id);

      if (!myCountry) return constructErrorResponse({ status: HttpStatus.NOT_FOUND });
      const newState = await this.stateRepository.createState(createStateDto.name, myCountry);
      return constructSuccessResponse(newState);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async findAllStates() {
    try {
      const data = await this.stateRepository.findAllStates();
      return constructSuccessResponse(data);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async findStateById(id: number) {
    try {
      const data = await this.stateRepository.findStateById(id);
      if (!data) return constructErrorResponse({ status: HttpStatus.NOT_FOUND });
      return constructSuccessResponse(data);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async updateState(id: number, updateStateDto: UpdateStateDto) {
    try {
      const data = await this.stateRepository.updateState(id, updateStateDto);
      return constructSuccessResponse(data);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async removeState(id: number) {
    try {
      const data = await this.stateRepository.deleteState(id);
      return constructSuccessResponse(data);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }
}
