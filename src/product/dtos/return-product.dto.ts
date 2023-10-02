import { ProductEntity } from '../entities/product.entity';

export class ReturnProductDto {
  id: number;
  name: string;
  image: string;
  price: number;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.name = productEntity.name;
    this.image = productEntity.image;
    this.price = productEntity.price;
  }
}
