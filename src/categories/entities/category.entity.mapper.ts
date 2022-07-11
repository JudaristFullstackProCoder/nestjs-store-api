import { CreateCategoryDto } from '../dto/create-category.dto';

export type CategoryEntityMap = {
  name: string;
  id: string;
};

export type CategoryApiFilterType = {
  name: string;
};

export class CategoryApiFilterClass {
  readonly name: string;
}

/**
 * Convert user object (comming from db) to api response object
 */
export const mapToCategoryEntity = function mapToCategoryEntity(
  e: CreateCategoryDto,
): CategoryEntityMap {
  return {
    id: e['_id'],
    name: e.name,
  };
};
