import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Country } from '../country/country.entity';
import { UpdateStateDto } from './dto/update-state.dto';
import { State } from './state.entity';

@EntityRepository(State)
export class StateRepository extends Repository<State> {
  private readonly logger = new Logger('STATE REPOSITORY');

  async createState(name: string, country: Country) {
    const newState = this.create({
      name,
      country,
    });

    this.logger.log(`creating new state  ${JSON.stringify(newState)}`);
    const state = await this.save(newState);
    return state;
  }
  async updateState(id: number, updateStateDto: UpdateStateDto) {
    const updateStateData = { id, ...updateStateDto };

    this.logger.log(`updating country id = ${id}`);
    const state = await this.update({ id: updateStateData.id }, { ...updateStateData });
    return state;
  }

  async findAllStates() {
    this.logger.log('find all states');
    const stateList = await this.find();
    return stateList;
  }
  async findStateById(id: number) {
    this.logger.log(`finding state by id ${id}`);
    const state = await this.findOne(id);
    state;
    return state;
  }
  async deleteState(id: number) {
    this.logger.log(`deleting state by id ${id}`);
    await this.delete(id);
    return true;
  }
}
