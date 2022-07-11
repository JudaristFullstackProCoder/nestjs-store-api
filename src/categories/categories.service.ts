import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@Inject(CategoryRepository) private repo: CategoryRepository) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.repo.addCategory(createCategoryDto);
  }

  findAll() {
    return this.repo.getAllCategories();
  }

  findOne(id: string) {
    return this.repo.getCategory(id);
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.repo.updateCategory(id, updateCategoryDto);
  }

  remove(id: string) {
    return this.repo.deleteCategory(id);
  }
}
