import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { SwaggerController, SwaggerSuccessResponse } from '../swagger/decorators';
import {
  DELETE_A_FEATURE,
  GET_A_FEATURE,
  GET_FEATURES,
  PATCH_FEATURE_UPDATE,
  POST_FEATURE_CREATE,
} from '../swagger/SwaggerAPIDetail';

@SwaggerController('Features')
@Controller()
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @SwaggerSuccessResponse(CreateFeatureDto, POST_FEATURE_CREATE)
  @Post()
  create(@Body() createFeatureDto: CreateFeatureDto, @Req() req: any) {
    return this.featuresService.create(createFeatureDto, req);
  }

  @SwaggerSuccessResponse({}, GET_FEATURES)
  @Get()
  findAll() {
    return this.featuresService.findAll();
  }

  @SwaggerSuccessResponse({}, GET_A_FEATURE)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.featuresService.findOne(+id);
  }

  @SwaggerSuccessResponse(UpdateFeatureDto, PATCH_FEATURE_UPDATE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeatureDto: UpdateFeatureDto, @Req() req: any) {
    return this.featuresService.update(+id, updateFeatureDto, req);
  }

  @SwaggerSuccessResponse({}, DELETE_A_FEATURE)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.featuresService.remove(+id, req);
  }
}
