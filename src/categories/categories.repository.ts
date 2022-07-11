import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Scope,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DELETE_ENTITY,
  SuccessApiResponse,
  UPDATE_ENTITY,
} from 'src/app/utils/api.controller.response';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, CategoryDocument } from './entities/category.entity';
import { mapToCategoryEntity } from './entities/category.entity.mapper';

@Injectable({ scope: Scope.DEFAULT })
export class CategoryRepository {
  constructor(
    @InjectModel('category') readonly categoryModel: Model<CategoryDocument>,
  ) {}
  async addCategory(
    category: CreateCategoryDto,
  ): Promise<Category | BadRequestException> {
    try {
      return mapToCategoryEntity(await new this.categoryModel(category).save());
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async deleteCategory(id: string) {
    try {
      return (await this.categoryModel.findByIdAndDelete(id))
        ? SuccessApiResponse(DELETE_ENTITY, 'category')
        : new UnprocessableEntityException();
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async updateCategory(id: string, category: unknown) {
    try {
      return (await this.categoryModel.findByIdAndUpdate(id, category))
        ? SuccessApiResponse(UPDATE_ENTITY, 'category')
        : new NotFoundException();
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getCategory(
    id: string,
  ): Promise<Category | BadRequestException | NotFoundException> {
    try {
      return (await this.categoryModel.findById(id)) ?? new NotFoundException();
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getAllCategories(): Promise<
    Category[] | InternalServerErrorException | NotFoundException
  > {
    try {
      return (
        (await this.categoryModel.find({})).map((e) =>
          mapToCategoryEntity(e),
        ) ?? new NotFoundException()
      );
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
}
