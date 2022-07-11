import { Option } from 'src/options/entities/option.entity';
import { Store } from 'src/stores/entities/store.entity';
import { User } from 'src/users/entities/user.entity';
import { Variation } from 'src/variations/entities/variation.entity';
import { Product } from './product.entity';

export type ProductEntityMapType = {
  id: string;
  description: string;
  longDescription: string;
  price: number;
  image: Express.Multer.File;
  images: Express.Multer.File[];
  store: Store;
  owner: User;
  options: Array<Option>;
  variations: Array<Variation>;
};

export class ProductEntityMapClass {
  id: string;
  description: string;
  longDescription: string;
  price: number;
  image: Express.Multer.File;
  images: Express.Multer.File[];
  store: Store;
  owner: User;
  options: Array<Option>;
  variations: Array<Variation>;
}

export const mapToProductEntity = function mapToProductEntity(
  e: Product,
): ProductEntityMapType {
  return {
    id: e['_id'],
    description: e.description,
    longDescription: e.longDescription,
    image: e.image,
    images: e.images,
    store: e.store,
    owner: e.shopkeeper,
    price: e.price,
    options: e.options,
    variations: e.variations,
  };
};
