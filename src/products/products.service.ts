import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(@Inject(ProductRepository) private repo: ProductRepository) {}
  create(createProductDto: CreateProductDto) {
    return this.repo.addProduct(createProductDto);
  }

  findAll() {
    return this.repo.getAllProducts();
  }

  findOne(id: string) {
    return this.repo.getProduct(id);
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.repo.updateProduct(id, updateProductDto);
  }

  remove(id: string) {
    return this.repo.deleteProduct(id);
  }
}
