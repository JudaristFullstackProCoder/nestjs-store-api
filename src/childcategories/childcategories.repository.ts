import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
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
import { CreateChildcategoryDto } from './dto/create-childcategory.dto';
import { UpdateChildcategoryDto } from './dto/update-childcategory.dto';
import {
  ChildCategory,
  ChildCategoryDocument,
} from './entities/childcategory.entity';
import {
  ChildCategoryEntityMapType,
  mapToChildCategoryEntity,
} from './entities/childcategory.entity.mapper';

@Injectable({ scope: Scope.DEFAULT })
export class ChildCategoryRepository {
  constructor(
    @InjectModel('childcategory')
    readonly ChildCategoryModel: Model<ChildCategoryDocument>,
  ) {}
  async addChildCategory(
    childcategory: CreateChildcategoryDto,
  ): Promise<ChildCategoryDocument | BadRequestException> {
    try {
      return await new this.ChildCategoryModel(childcategory).save();
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async deleteChildCategory(id: string) {
    try {
      return (await this.ChildCategoryModel.findByIdAndDelete(id))
        ? SuccessApiResponse(DELETE_ENTITY, 'childcategory')
        : new NotFoundException();
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async updateChildCategory(
    id: string,
    childcategory: Record<string, unknown> | UpdateChildcategoryDto,
  ) {
    try {
      const updated = await this.ChildCategoryModel.findByIdAndUpdate(
        id,
        childcategory,
      );
      return updated
        ? SuccessApiResponse(UPDATE_ENTITY, 'childcategory')
        : new NotFoundException();
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getChildCategory(
    id: string,
  ): Promise<
    | Record<string, unknown>
    | BadRequestException
    | CreateChildcategoryDto
    | ChildCategoryDocument
    | NotFoundException
  > {
    try {
      const childcategory = await this.ChildCategoryModel.findById(id);
      if (!(childcategory instanceof BadRequestException)) {
        if (!childcategory) {
          return new NotFoundException();
        }
      }
      return childcategory;
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getOneChildCategory(
    filters: Record<string, unknown>,
  ): Promise<ChildCategory | BadRequestException> {
    try {
      return (
        (await this.ChildCategoryModel.findOne(filters)) ??
        new NotFoundException()
      );
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getAllChildCategorys(): Promise<
    ChildCategoryEntityMapType[] | BadRequestException | NotFoundException
  > {
    try {
      return (
        (await this.ChildCategoryModel.find({})).map((e) =>
          mapToChildCategoryEntity(e),
        ) ?? new NotFoundException()
      );
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async addChildCategoryOption(childCategoryId: string, optionId) {
    try {
      const result = await this.ChildCategoryModel.findByIdAndUpdate(
        {
          _id: childCategoryId,
        },
        {
          $push: {
            options: optionId,
          },
        },
        {},
      );
      return SuccessApiResponse(UPDATE_ENTITY, 'CHILD CATEGORY', result);
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
  async removeChildCategoryOption(childCategoryId: string, optionId) {
    try {
      const result = await this.ChildCategoryModel.findByIdAndUpdate(
        {
          _id: childCategoryId,
        },
        {
          $pull: {
            options: optionId,
          },
        },
        {},
      );
      return SuccessApiResponse(UPDATE_ENTITY, 'child category', result);
    } catch (e) {
      return new InternalServerErrorException(e);
    }
  }
}
