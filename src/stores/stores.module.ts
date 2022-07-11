import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreSchema } from './entities/store.entity';
import { StoreRepository } from './store-repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'store', schema: StoreSchema }]),
  ],
  controllers: [StoresController],
  providers: [StoresService, StoreRepository],
})
export class StoresModule {}
