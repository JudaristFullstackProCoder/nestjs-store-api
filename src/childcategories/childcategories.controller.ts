import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  InternalServerErrorException,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessApiResponse } from 'src/app/utils/api.controller.response';
import { ChildcategoriesService } from './childcategories.service';
import { CreateChildcategoryDto } from './dto/create-childcategory.dto';
import { UpdateChildcategoryDto } from './dto/update-childcategory.dto';
import { ChildCategoryEntityMapClass } from './entities/childcategory.entity.mapper';

@ApiTags('Child Category')
@Controller('childcategories')
export class ChildcategoriesController {
  constructor(
    private readonly childcategoriesService: ChildcategoriesService,
  ) {}

  @Post()
  @ApiBody({
    type: CreateChildcategoryDto,
    description: 'a list of filters to select categor(y|ies)',
    required: true,
  })
  @ApiOkResponse({
    status: 201,
    description: 'a category was successfully created',
    type: ChildCategoryEntityMapClass,
    isArray: true,
  })
  @ApiBadRequestResponse({
    status: 400,
    type: BadRequestException,
    description:
      'the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
  })
  @ApiInternalServerErrorResponse({
    description:
      ' the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
    status: 500,
  })
  create(@Body() createChildcategoryDto: CreateChildcategoryDto) {
    return this.childcategoriesService.create(createChildcategoryDto);
  }

  @Get()
  @ApiOkResponse({
    status: 200,
    description: 'when we found categor(y)/(ies)',
    type: ChildCategoryEntityMapClass,
    isArray: true,
  })
  @ApiBadRequestResponse({
    status: 400,
    type: BadRequestException,
    description:
      'the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
  })
  @ApiInternalServerErrorResponse({
    description:
      ' the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
    status: 500,
  })
  @ApiNotFoundResponse({
    description: "the server can't find the requested resource",
    type: NotFoundException,
    status: 404,
  })
  findAll() {
    return this.childcategoriesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    status: 200,
    description: 'when we found a categor(y)',
    type: ChildCategoryEntityMapClass,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description:
      ' the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
    status: 500,
  })
  @ApiBadRequestResponse({
    status: 400,
    type: BadRequestException,
    description:
      'the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
  })
  @ApiParam({
    name: 'id',
    description: 'the id of the child category we want to fetch',
    required: true,
    type: String,
  })
  @ApiNotFoundResponse({
    description: "the server can't find the requested resource",
    type: ChildCategoryEntityMapClass,
    status: 404,
  })
  findOne(@Param('id') id: string) {
    return this.childcategoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    status: 200,
    description: 'the category was successfully updated',
    type: SuccessApiResponse,
  })
  @ApiInternalServerErrorResponse({
    description:
      ' the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
    status: 500,
  })
  @ApiBadRequestResponse({
    status: 400,
    type: BadRequestException,
    description:
      'the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
  })
  @ApiParam({
    name: 'id',
    description: 'the id of the child category we want to fetch',
    required: true,
    type: String,
  })
  update(
    @Param('id') id: string,
    @Body() updateChildcategoryDto: UpdateChildcategoryDto,
  ) {
    return this.childcategoriesService.update(id, updateChildcategoryDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    status: 200,
    description: 'the category was successfully deleted',
    type: SuccessApiResponse,
  })
  @ApiInternalServerErrorResponse({
    description:
      ' the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
    status: 500,
  })
  @ApiBadRequestResponse({
    status: 400,
    type: BadRequestException,
    description:
      'the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
  })
  @ApiParam({
    name: 'id',
    description: 'the id of the child category we want to fetch',
    required: true,
    type: String,
  })
  remove(@Param('id') id: string) {
    return this.childcategoriesService.remove(id);
  }

  @HttpCode(200)
  @Post(':childCategoryId/add_option/:optionId')
  @ApiParam({
    name: 'optionId',
    description: 'the id of the option we want to add to child category',
    required: true,
  })
  @ApiParam({
    name: 'childCategoryId',
    description: 'the id of the child category',
    required: true,
  })
  @ApiInternalServerErrorResponse({
    description:
      ' the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
    status: 500,
  })
  addOption(
    @Param('childCategoryId') childCategoryId: string,
    @Param('optionId') optionId: string,
  ) {
    return this.childcategoriesService.addOption(childCategoryId, optionId);
  }

  @HttpCode(200)
  @Post(':childCategoryId/remove_option/:optionId')
  @ApiParam({
    name: 'childCategoryId',
    description: 'the id of the child category',
    required: true,
  })
  @ApiParam({
    name: 'optionId',
    description: 'the id of the option we want to remove',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: 'child category was successfully deleted',
    type: SuccessApiResponse,
  })
  @ApiInternalServerErrorResponse({
    description:
      ' the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
    status: 500,
  })
  removeOption(
    @Param('childCategoryId') childCategoryId: string,
    @Param('optionId') optionId: string,
  ) {
    return this.childcategoriesService.removeOption(childCategoryId, optionId);
  }
}
