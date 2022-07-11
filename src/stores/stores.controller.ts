import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessApiResponse } from 'src/app/utils/api.controller.response';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({
    required: true,
    type: CreateStoreDto,
    description: 'store data',
  })
  @ApiCreatedResponse({
    description: 'the created store',
    type: CreateStoreDto,
    status: 201,
  })
  @ApiInternalServerErrorResponse({
    description: 'when an error occured',
    type: InternalServerErrorException,
  })
  create(@Body() createStoreDto: CreateStoreDto) {
    return this.storesService.create(createStoreDto);
  }

  @Get()
  @ApiOkResponse({
    isArray: true,
    description: 'the list of store',
    type: CreateStoreDto,
    status: 200,
  })
  @ApiNotFoundResponse({
    description: 'when no store was found',
    type: NotFoundException,
    status: 404,
  })
  @ApiInternalServerErrorResponse({
    description: 'when an error occured',
    type: InternalServerErrorException,
  })
  findAll() {
    return this.storesService.findAll();
  }

  @ApiParam({
    name: 'id',
    description: 'the id of the store you want to fetch',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    description: 'the store',
    type: CreateStoreDto,
    status: 200,
  })
  @ApiNotFoundResponse({
    description: 'when no store was found',
    type: NotFoundException,
    status: 404,
  })
  @ApiInternalServerErrorResponse({
    description: 'when an error occured',
    type: InternalServerErrorException,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(id);
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'the store was successfully updated',
    type: SuccessApiResponse,
  })
  @ApiParam({
    name: 'id',
    description: 'the id of the user we want to update',
    type: String,
    required: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'when an error occured',
    type: InternalServerErrorException,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(id, updateStoreDto);
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'the store was successfully updated',
    type: SuccessApiResponse,
  })
  @ApiParam({
    name: 'id',
    description: 'the id of the user we want to delete',
    type: String,
    required: true,
  })
  @ApiInternalServerErrorResponse({
    description: 'when an error occured',
    type: InternalServerErrorException,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(id);
  }
}
