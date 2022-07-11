import { Inject, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoreRepository } from './store-repository';

@Injectable()
export class StoresService {
  constructor(@Inject(StoreRepository) private repo: StoreRepository) {}
  async create(createStoreDto: CreateStoreDto) {
    return await this.repo.addStore(createStoreDto);
  }

  async findAll() {
    return await this.repo.getAllStores();
  }

  async findOne(id: string) {
    return this.repo.getStore(id);
  }

  async update(id: string, updateStoreDto: UpdateStoreDto) {
    return await this.repo.updateStore(id, updateStoreDto);
  }

  async remove(id: string) {
    return await this.repo.deleteStore(id);
  }
}
