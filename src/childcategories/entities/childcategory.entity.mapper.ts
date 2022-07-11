import { ApiProperty } from '@nestjs/swagger';
import {
  CategoryEntityMap,
  mapToCategoryEntity,
} from 'src/categories/entities/category.entity.mapper';
import { Option } from 'src/options/entities/option.entity';

export type ChildCategoryEntityMapType = {
  name: string;
  parent: CategoryEntityMap;
  id: string;
  options: Option[];
};

export class ChildCategoryEntityMapClass {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly parent: CategoryEntityMap;
  @ApiProperty()
  id: string;
}

export const mapToChildCategoryEntity = function mapToOptionEntity(
  e,
): ChildCategoryEntityMapType {
  return {
    name: e.name,
    id: e['_id'],
    parent: mapToCategoryEntity(e.parent),
    options: e.options,
  };
};
