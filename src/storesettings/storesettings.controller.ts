import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoresettingsService } from './storesettings.service';
import { CreateStoresettingDto } from './dto/create-storesetting.dto';
import { UpdateStoresettingDto } from './dto/update-storesetting.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('store settings')
@Controller('storesettings')
export class StoresettingsController {
  constructor(private readonly storesettingsService: StoresettingsService) {}

  @Post()
  create(@Body() createStoresettingDto: CreateStoresettingDto) {
    return this.storesettingsService.create(createStoresettingDto);
  }

  @Get()
  findAll() {
    return this.storesettingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesettingsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStoresettingDto: UpdateStoresettingDto,
  ) {
    return this.storesettingsService.update(+id, updateStoresettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesettingsService.remove(+id);
  }
}
