import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessApiResponse } from 'src/app/utils/api.controller.response';
import { CreatedOptionResponse } from './dto/create-option-response.dto';

@ApiTags('Options')
@Controller('options')
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'A record has successfully created',
    type: SuccessApiResponse,
  })
  @ApiInternalServerErrorResponse({
    description: 'when unknow exception occured',
    type: InternalServerErrorException,
  })
  @ApiBadRequestResponse({
    description: 'there was an error',
    type: BadRequestException,
    status: 404,
  })
  create(@Body() createOptionDto: CreateOptionDto) {
    return this.optionsService.create(createOptionDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOkResponse({
    description: 'when we get a record from database',
    type: SuccessApiResponse,
  })
  @ApiNotFoundResponse({
    description: 'when notting was founded',
    type: NotFoundException,
    status: 404,
  })
  @ApiInternalServerErrorResponse({
    description: 'when unknow exception occured',
    type: InternalServerErrorException,
  })
  findAll() {
    return this.optionsService.findAll();
  }

  @ApiOkResponse({
    status: 200,
    description: 'we found a result',
    type: CreatedOptionResponse,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'no items was found !',
    type: NotFoundException,
  })
  @ApiInternalServerErrorResponse({
    description: 'when unknow exception occured',
    type: InternalServerErrorException,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionsService.findOne(id);
  }

  @ApiOkResponse({
    status: 200,
    description: 'we found a result',
    type: SuccessApiResponse,
  })
  @ApiBadRequestResponse({
    description: 'error when trying to update the option',
    type: BadRequestException,
  })
  @ApiInternalServerErrorResponse({
    description: 'when unknow exception occured',
    type: InternalServerErrorException,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionDto: UpdateOptionDto) {
    return this.optionsService.update(id, updateOptionDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    status: 200,
    description: 'the record has been successfully deleted',
    type: SuccessApiResponse,
  })
  @ApiBadRequestResponse({
    description: "when we can't delete the record",
    type: BadRequestException,
  })
  @ApiInternalServerErrorResponse({
    description: 'when unknow exception occured',
    type: InternalServerErrorException,
  })
  remove(@Param('id') id: string) {
    return this.optionsService.remove(id);
  }
}
