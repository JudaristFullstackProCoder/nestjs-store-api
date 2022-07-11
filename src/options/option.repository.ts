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
import { CreateOptionDto } from './dto/create-option.dto';
import { UpdateOptionDto } from './dto/update-option.dto';
import { Option, OptionDocument } from './entities/option.entity';
import {
  mapToOptionEntity,
  OptionEntityMap,
} from './entities/option.entity.mapper';

@Injectable({ scope: Scope.DEFAULT })
export class OptionRepository {
  constructor(
    @InjectModel('option') readonly optionModel: Model<OptionDocument>,
  ) {}
  async addOption(
    option: CreateOptionDto,
  ): Promise<Option | BadRequestException> {
    try {
      return mapToOptionEntity(await new this.optionModel(option).save());
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async deleteOption(id: string) {
    try {
      return (await this.optionModel.findByIdAndDelete(id))
        ? SuccessApiResponse(DELETE_ENTITY, 'option')
        : new NotFoundException();
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async updateOption(
    id: string,
    option: Record<string, unknown> | UpdateOptionDto,
  ) {
    try {
      const updated = await this.optionModel.findByIdAndUpdate(id, option);
      return updated
        ? SuccessApiResponse(UPDATE_ENTITY, 'option')
        : new NotFoundException();
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getOption(
    id: string,
  ): Promise<
    | Record<string, unknown>
    | BadRequestException
    | CreateOptionDto
    | OptionDocument
  > {
    try {
      const option = await this.optionModel.findById(id);
      if (!(option instanceof BadRequestException)) {
        if (!option) {
          return new NotFoundException();
        }
      }
      return option;
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getOneOption(
    filters: Record<string, unknown>,
  ): Promise<Option | BadRequestException> {
    try {
      return (
        (await this.optionModel.findOne(filters)) ?? new NotFoundException()
      );
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getAllOptions(): Promise<OptionEntityMap[] | BadRequestException> {
    try {
      return (
        (await this.optionModel.find({}, { id: 1, name: 1, __v: -1 })).map(
          (e) => mapToOptionEntity(e),
        ) ?? new NotFoundException()
      );
    } catch (e) {
      return new BadRequestException(e);
    }
  }
}
