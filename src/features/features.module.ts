import { Module } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { FeaturesController } from './features.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturesRepository } from './features.repository';

@Module({
  controllers: [FeaturesController],
  providers: [FeaturesService],
  imports: [TypeOrmModule.forFeature([FeaturesRepository])],
})
export class FeaturesModule {}
