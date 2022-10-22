import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { State } from '../state/state.entity';
import { City } from './city.entity';
import { UpdateCityDto } from './dto/update-city.dto';

@EntityRepository(City)
export class CityRepository extends Repository<City> {
  private readonly logger = new Logger('CITY REPOSITORY');

  async createCity(name: string, state: State) {
    const newCity = this.create({
      name,
      state,
    });

    this.logger.log(`creating new city  ${JSON.stringify(newCity)}`);
    const city = await this.save(newCity);
    return city;
  }

  async updateCity(id: number, updateCityDto: UpdateCityDto) {
    const updateCityData = { id, ...updateCityDto };

    this.logger.log(`updating city id = ${id}`);
    const city = await this.update({ id: updateCityData.id }, { ...updateCityData });
    return city;
  }

  async findAllCities() {
    this.logger.log('find all cities');
    const cityList = await this.find();
    return cityList;
  }
  async findCityById(id: number) {
    this.logger.log(`finding city by id ${id}`);
    const city = await this.findOne(id);
    return city;
  }
  async deleteCity(id: number) {
    this.logger.log(`deleting city by id ${id}`);
    await this.delete(id);
    return true;
  }
}
