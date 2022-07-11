import { Inject, Injectable } from '@nestjs/common';
import { ChildCategoryRepository } from './childcategories.repository';
import { CreateChildcategoryDto } from './dto/create-childcategory.dto';
import { UpdateChildcategoryDto } from './dto/update-childcategory.dto';

@Injectable()
export class ChildcategoriesService {
  constructor(
    @Inject(ChildCategoryRepository) private repo: ChildCategoryRepository,
  ) {}
  create(createChildcategoryDto: CreateChildcategoryDto) {
    return this.repo.addChildCategory(createChildcategoryDto);
  }

  findAll() {
    return this.repo.getAllChildCategorys();
  }

  findOne(id: string) {
    return this.repo.getChildCategory(id);
  }

  update(id: string, updateChildcategoryDto: UpdateChildcategoryDto) {
    return this.repo.updateChildCategory(id, updateChildcategoryDto);
  }

  remove(id: string) {
    return this.repo.deleteChildCategory(id);
  }

  addOption(childCategoryId: string, optionId: string) {
    return this.repo.addChildCategoryOption(childCategoryId, optionId);
  }

  removeOption(childCategoryId: string, optionId: string) {
    return this.repo.addChildCategoryOption(childCategoryId, optionId);
  }
}
