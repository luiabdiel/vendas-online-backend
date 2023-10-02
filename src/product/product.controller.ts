import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { ReturnProductDto } from './dtos/return-product.dto';

@Roles(UserType.Admin, UserType.User)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAllProduct(): Promise<ReturnProductDto[]> {
    return (await this.productService.findAllProduct()).map(
      (product) => new ReturnProductDto(product),
    );
  }
}
