import {
  mapToUserEntity,
  UserEntityMapClass,
} from 'src/users/entities/user.entity.mapper';
import { StoreDocument } from './store.entity';

export type StoreEntityMap = {
  name: string;
  id: string;
  shopkeeper: UserEntityMapClass;
};

export const mapToStoreEntity = function mapToStoreEntity(
  e: StoreDocument,
): StoreEntityMap {
  return {
    name: e.name,
    shopkeeper: mapToUserEntity(e.owner),
    id: e['_id'],
  };
};
