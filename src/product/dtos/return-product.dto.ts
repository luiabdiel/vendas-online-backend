import { ReturnCategoryDto } from 'src/category/dtos/return-category.dto';
import { ProductEntity } from '../entities/product.entity';

export class ReturnProductDto {
  id: number;
  name: string;
  image: string;
  price: number;
  category?: ReturnCategoryDto;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.name = productEntity.name;
    this.image = productEntity.image;
    this.price = productEntity.price;
    this.category = productEntity.category
      ? new ReturnCategoryDto(productEntity.category)
      : undefined;
  }
}
