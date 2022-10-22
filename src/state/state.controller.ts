import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { StateService } from './state.service';

@Controller()
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  create(@Body() CreateStateDto: CreateStateDto) {
    return this.stateService.createState(CreateStateDto);
  }

  @Get()
  findAll() {
    return this.stateService.findAllStates();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stateService.findStateById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStateDto: UpdateStateDto) {
    return this.stateService.updateState(+id, updateStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stateService.removeState(+id);
  }
}
