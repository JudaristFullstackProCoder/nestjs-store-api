import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SuccessApiResponse,
  UPDATE_ENTITY,
} from 'src/app/utils/api.controller.response';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store, StoreDocument } from './entities/store.entity';
import {
  mapToStoreEntity,
  StoreEntityMap,
} from './entities/store.entity.mapper';

@Injectable({ scope: Scope.DEFAULT })
export class StoreRepository {
  constructor(
    @InjectModel('store') readonly storeModel: Model<StoreDocument>,
  ) {}
  async addStore(
    store: CreateStoreDto,
  ): Promise<StoreEntityMap | BadRequestException> {
    try {
      return mapToStoreEntity(await new this.storeModel(store).save());
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async deleteStore(id: string) {
    try {
      return (
        (await this.storeModel.findByIdAndDelete(id)) ?? new NotFoundException()
      );
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async updateStore(
    id: string,
    store: Record<string, unknown> | UpdateStoreDto,
  ) {
    try {
      const updated = await this.storeModel.findByIdAndUpdate(id, store);
      return updated
        ? SuccessApiResponse(UPDATE_ENTITY, 'store')
        : new NotFoundException();
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getStore(
    id: string,
  ): Promise<
    | Record<string, unknown>
    | BadRequestException
    | CreateStoreDto
    | StoreDocument
  > {
    try {
      const store = await this.storeModel.findById(id);
      if (!(store instanceof BadRequestException)) {
        if (!store) {
          return new NotFoundException();
        }
      }
      return mapToStoreEntity(store);
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getOneStore(
    filters: Record<string, unknown>,
  ): Promise<Store | BadRequestException> {
    try {
      return (
        (await this.storeModel.findOne(filters)) ?? new NotFoundException()
      );
    } catch (e) {
      return new BadRequestException(e);
    }
  }
  async getAllStores(): Promise<Store[] | BadRequestException> {
    try {
      return (await this.storeModel.find({})) ?? new NotFoundException();
    } catch (e) {
      return new BadRequestException(e);
    }
  }
}
