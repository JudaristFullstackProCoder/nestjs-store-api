import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DELETE_ENTITY,
  SuccessApiResponse,
  UPDATE_ENTITY,
} from 'src/app/utils/api.controller.response';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDocument } from './entities/product.entity';
import {
  mapToProductEntity,
  ProductEntityMapType,
} from './entities/product.entity.mapper';

@Injectable({ scope: Scope.DEFAULT })
export class ProductRepository {
  constructor(
    @InjectModel('product')
    readonly ProductModel: Model<ProductDocument>,
  ) {}
  async addProduct(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntityMapType | BadRequestException> {
    try {
      return mapToProductEntity(
        await new this.ProductModel(createProductDto).save(),
      );
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async deleteProduct(id: string) {
    try {
      return (await this.ProductModel.findByIdAndDelete(id))
        ? SuccessApiResponse(DELETE_ENTITY, 'product')
        : new NotFoundException();
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      const updated = await this.ProductModel.findByIdAndUpdate(
        id,
        updateProductDto,
      );
      return updated
        ? SuccessApiResponse(UPDATE_ENTITY, 'product')
        : new NotFoundException();
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getProduct(
    id: string,
  ): Promise<BadRequestException | ProductEntityMapType | NotFoundException> {
    try {
      const product = await this.ProductModel.findById(id, undefined, {
        autopopulate: false,
        populate: '',
      });
      if (!(product instanceof BadRequestException)) {
        if (!product) {
          return new NotFoundException();
        }
      }
      return mapToProductEntity(product);
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getOneProduct(
    filters: Record<string, unknown>,
  ): Promise<ProductEntityMapType | BadRequestException> {
    try {
      return (
        (await this.ProductModel.findOne(filters)) ?? new NotFoundException()
      );
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getAllProducts(): Promise<
    ProductEntityMapType[] | BadRequestException | NotFoundException
  > {
    try {
      return (
        (await this.ProductModel.find({})).map((e) => mapToProductEntity(e)) ??
        new NotFoundException()
      );
    } catch (e) {
      return new BadRequestException(e);
    }
  }
}
