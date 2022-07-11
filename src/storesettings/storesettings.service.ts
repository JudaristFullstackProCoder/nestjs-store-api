import { Injectable } from '@nestjs/common';
import { CreateStoresettingDto } from './dto/create-storesetting.dto';
import { UpdateStoresettingDto } from './dto/update-storesetting.dto';

@Injectable()
export class StoresettingsService {
  create(createStoresettingDto: CreateStoresettingDto) {
    return 'This action adds a new storesetting';
  }

  findAll() {
    return `This action returns all storesettings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} storesetting`;
  }

  update(id: number, updateStoresettingDto: UpdateStoresettingDto) {
    return `This action updates a #${id} storesetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} storesetting`;
  }
}
