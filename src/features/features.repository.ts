import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature } from './entities/feature.entity';

@EntityRepository(Feature)
export class FeaturesRepository extends Repository<Feature> {
  private readonly logger = new Logger('FEATURES REPOSITORY');

  async createFeature(createFeatureDto: CreateFeatureDto, created_by: number) {
    const newFeature = this.create({
      name: createFeatureDto.name,
      created_by_id: created_by,
    });
    this.logger.log(`creating new feature  ${JSON.stringify(newFeature)}`);
    const feature = await this.save(newFeature);
    return feature;
  }

  async updateFeature(id: number, updateFeatureDto: UpdateFeatureDto, updated_by: number) {
    const updateFeatureData = { id, updated_by_id: updated_by, name: updateFeatureDto.name };

    this.logger.log(`updating feature id = ${id}`);
    const feature = await this.update({ id: updateFeatureData.id }, { ...updateFeatureData });
    return feature;
  }

  async findAllFeatures() {
    this.logger.log('find all features');
    const featureList = await this.find();
    return featureList;
  }
  async findFeatureById(id: number) {
    this.logger.log(`finding feature by id ${id}`);
    const feature = await this.findOne(id);
    return feature;
  }
  async deleteFeature(id: number, updated_by: number) {
    this.logger.log(`deleting feature by id ${id}`);

    const updateFeatureData = { id, updated_by_id: updated_by, deleted_at: new Date() };
    await this.update({ id: updateFeatureData.id }, { ...updateFeatureData });

    return true;
  }
}
