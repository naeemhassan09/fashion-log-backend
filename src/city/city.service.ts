import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { constructErrorResponse, constructSuccessResponse } from '../core/wrappers';
import { StateRepository } from '../state/state.repository';
import { CityRepository } from './city.repository';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityService {
  private logger = new Logger('CITY SERVICE');

  constructor(
    @InjectRepository(StateRepository)
    private readonly stateRepository: StateRepository,
    @InjectRepository(CityRepository)
    private readonly cityRepository: CityRepository
  ) {}

  async createCity(createCityDto: CreateCityDto) {
    try {
      const myState = await this.stateRepository.findStateById(createCityDto.state_id);
      if (!myState) return constructErrorResponse({ status: HttpStatus.NOT_FOUND });
      const newCity = await this.cityRepository.createCity(createCityDto.name, myState);
      return constructSuccessResponse(newCity);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async findAllCities() {
    try {
      const data = await this.cityRepository.findAllCities();
      return constructSuccessResponse(data);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async findCityById(id: number) {
    try {
      const data = await this.cityRepository.findCityById(id);
      if (!data) return constructErrorResponse({ status: HttpStatus.NOT_FOUND });
      return constructSuccessResponse(data);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async updateCity(id: number, updateCityDto: UpdateCityDto) {
    try {
      const data = await this.cityRepository.updateCity(id, updateCityDto);
      return constructSuccessResponse(data);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }

  async removeCity(id: number) {
    try {
      const data = await this.cityRepository.deleteCity(id);
      return constructSuccessResponse(data);
    } catch (error) {
      return constructErrorResponse(error);
    }
  }
}
