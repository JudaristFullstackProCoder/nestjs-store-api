import { Module } from '@nestjs/common';
import { ChildcategoriesService } from './childcategories.service';
import { ChildcategoriesController } from './childcategories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ChildCategorySchema } from './entities/childcategory.entity';
import { ChildCategoryRepository } from './childcategories.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'childcategory', schema: ChildCategorySchema },
    ]),
  ],
  controllers: [ChildcategoriesController],
  providers: [ChildcategoriesService, ChildCategoryRepository],
})
export class ChildcategoriesModule {}
