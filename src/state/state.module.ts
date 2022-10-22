import { Module } from '@nestjs/common';
import { StateService } from './state.service';
import { StateController } from './state.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateRepository } from './state.repository';
import { CountryRepository } from '../country/country.repository';

@Module({
  controllers: [StateController],
  providers: [StateService],
  imports: [TypeOrmModule.forFeature([StateRepository]), TypeOrmModule.forFeature([CountryRepository])],
  exports: [StateService],
})
export class StateModule {}
