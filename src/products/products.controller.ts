import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  HttpCode,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ProductEntityMapClass } from './entities/product.entity.mapper';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiInternalServerErrorResponse({
    description:
      ' the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
    status: 500,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
    description:
      'the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
    status: 400,
  })
  @ApiBody({
    required: true,
    type: CreateProductDto,
    description: 'the product we want to create',
  })
  @ApiCreatedResponse({
    description: 'the product has been successfully created',
    status: 201,
    type: CreateUserDto,
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @HttpCode(200)
  @Get()
  @ApiInternalServerErrorResponse({
    description:
      ' the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
    status: 500,
  })
  @ApiOkResponse({
    status: 200,
    type: ProductEntityMapClass,
    description: ' the request has succeeded. The resource has been fetched.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    type: NotFoundException,
    description: "the server can't find the requested resource.",
    status: 404,
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiInternalServerErrorResponse({
    description:
      ' the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
    status: 500,
  })
  @ApiOkResponse({
    status: 200,
    type: ProductEntityMapClass,
    description: ' the request has succeeded. The resource has been fetched.',
  })
  @ApiNotFoundResponse({
    type: NotFoundException,
    description: "the server can't find the requested resource.",
    status: 404,
  })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    required: true,
    type: UpdateProductDto,
    description: 'A list of type to update',
  })
  @ApiInternalServerErrorResponse({
    description:
      ' the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
    status: 500,
  })
  @ApiOkResponse({
    status: 200,
    type: ProductEntityMapClass,
    description: ' the request has succeeded. The resource has been updated.',
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @HttpCode(200)
  @Delete(':id')
  @ApiInternalServerErrorResponse({
    description:
      ' the server encountered an unexpected condition that prevented it from fulfilling the request.',
    type: InternalServerErrorException,
    status: 500,
  })
  @ApiOkResponse({
    status: 200,
    type: ProductEntityMapClass,
    description: ' the request has succeeded. The resource has been deleted.',
  })
  @ApiParam({
    name: 'id',
    description: 'the id of the product that we want to delete',
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
