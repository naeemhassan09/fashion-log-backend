import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityRepository } from './city.repository';
import { StateRepository } from '../state/state.repository';

@Module({
  controllers: [CityController],
  providers: [CityService],
  imports: [TypeOrmModule.forFeature([CityRepository]), TypeOrmModule.forFeature([StateRepository])],
})
export class CityModule {}
