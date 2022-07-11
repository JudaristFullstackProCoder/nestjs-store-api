import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { SuccessApiResponse } from 'src/app/utils/api.controller.response';
import { CategoriesService } from './categories.service';
import { CreatedCategoryResponse } from './dto/create-category-response.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryApiFilterClass } from './entities/category.entity.mapper';

@ApiTags('Category')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiCreatedResponse({
    type: CreatedCategoryResponse,
    status: 201,
    description: 'category was successfumy created',
  })
  @ApiInternalServerErrorResponse({
    description:
      'the server encountered an unexpected condition that prevented it from fulfilling the request.',
    status: 500,
    type: InternalServerErrorException,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
    description:
      'the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'we found some category',
    status: 200,
    type: CreatedCategoryResponse,
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: NotFoundException,
    description: 'no category was found !',
    status: 404,
  })
  @ApiInternalServerErrorResponse({
    description:
      'the server encountered an unexpected condition that prevented it from fulfilling the request.',
    status: 500,
    type: InternalServerErrorException,
  })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'the id of the categery we want to fetch',
    required: true,
    type: String,
  })
  @ApiNotFoundResponse({
    description: 'nothing was found !',
    type: NotFoundException,
  })
  @ApiFoundResponse({
    description: 'we found a category',
    type: CategoryApiFilterClass,
  })
  @ApiInternalServerErrorResponse({
    description:
      'the server encountered an unexpected condition that prevented it from fulfilling the request.',
    status: 500,
    type: InternalServerErrorException,
  })
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    description: 'the id of the categery we want to update',
    required: true,
    type: String,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
    description:
      'the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
  })
  @ApiOkResponse({
    description: 'this category was successfully updated',
    type: SuccessApiResponse,
  })
  @ApiInternalServerErrorResponse({
    description:
      'the server encountered an unexpected condition that prevented it from fulfilling the request.',
    status: 500,
    type: InternalServerErrorException,
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'this category was successfully deleted',
    type: SuccessApiResponse,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
    description:
      'the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
  })
  @ApiUnprocessableEntityResponse({
    type: UnprocessableEntityException,
    description:
      'the server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions. ',
  })
  @ApiInternalServerErrorResponse({
    description:
      'the server encountered an unexpected condition that prevented it from fulfilling the request.',
    status: 500,
    type: InternalServerErrorException,
  })
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
