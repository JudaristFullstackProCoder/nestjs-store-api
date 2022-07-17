import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PromocodesService } from './promocodes.service';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto } from './dto/update-promocode.dto';

@Controller('promocodes')
export class PromocodesController {
  constructor(private readonly promocodesService: PromocodesService) {}

  @Post()
  create(@Body() createPromocodeDto: CreatePromocodeDto) {
    return this.promocodesService.create(createPromocodeDto);
  }

  @Get()
  findAll() {
    return this.promocodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promocodesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePromocodeDto: UpdatePromocodeDto,
  ) {
    return this.promocodesService.update(+id, updatePromocodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promocodesService.remove(+id);
  }
}
