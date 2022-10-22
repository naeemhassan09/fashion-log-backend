import { Injectable } from '@nestjs/common';
import { constructErrorResponse, constructSuccessResponse } from '../core/wrappers';
import { NotFoundException } from '../shared';
import { SERVER_RESPONSES } from '../shared/constants/serverResponse';

import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { FeaturesRepository } from './features.repository';

@Injectable()
export class FeaturesService {
  constructor(private readonly featureRepository: FeaturesRepository) {}

  /**
   * Adding new Feature (name only)
   * @param createFeatureDto
   * @param req
   * @returns @Feature
   */
  async create(createFeatureDto: CreateFeatureDto, req: any) {
    const data = await this.featureRepository.createFeature(createFeatureDto, req.user.id);
    return constructSuccessResponse(data);
  }

  findAll() {
    //getting all the features including deleted ones.
    return this.featureRepository.findAllFeatures();
  }

  /**
   * Getting feature which is not deleted yet
   * @param id
   * @returns @Feature
   */
  async findOne(id: number) {
    const data = await this.featureRepository.findFeatureById(id);
    if (!data?.deleted_at) {
      return constructSuccessResponse(data);
    }
    return constructErrorResponse(new NotFoundException(SERVER_RESPONSES.NOT_FOUND_MESSAGE));
  }

  /**
   * updating base on soft delete record
   * @param id
   * @param updateFeatureDto
   * @param req
   * @returns
   */
  async update(id: number, updateFeatureDto: UpdateFeatureDto, req: any) {
    const feature = await this.featureRepository.findFeatureById(id);
    if (!feature?.deleted_at) {
      const data = await this.featureRepository.updateFeature(id, updateFeatureDto, req.user.id);
      return constructSuccessResponse(data);
    }
    return constructErrorResponse(new NotFoundException(SERVER_RESPONSES.NOT_FOUND_MESSAGE));
  }

  /**
   * Record Soft deleting - setting deleted_at column for that
   * @param id
   * @param req
   * @returns @boolean
   */
  async remove(id: number, req: any) {
    const feature = await this.featureRepository.findFeatureById(id);
    if (!feature?.deleted_at) {
      const data = await this.featureRepository.deleteFeature(id, req.user.id);
      return constructSuccessResponse(data);
    }
    return constructErrorResponse(new NotFoundException(SERVER_RESPONSES.NOT_FOUND_MESSAGE));
  }
}
