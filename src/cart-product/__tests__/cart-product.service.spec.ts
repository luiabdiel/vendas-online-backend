import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from '../cart-product.service';
import { ProductService } from '../../product/product.service';
import { Repository } from 'typeorm';
import { CartProductEntity } from '../entities/cart-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../../product/__mocks__/product.mock';

describe('CartProductService', () => {
  let service: CartProductService;
  let productService: ProductService;
  let cartProductRepository: Repository<CartProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartProductService,
        {
          provide: ProductService,
          useValue: {
            findOne: '',
            save: '',
            delete: '',
          },
        },
        {
          provide: getRepositoryToken(CartProductEntity),
          useValue: {
            findProductById: jest.fn().mockResolvedValue(productMock),
          },
        },
      ],
    }).compile();

    service = module.get<CartProductService>(CartProductService);
    productService = module.get<ProductService>(ProductService);
    cartProductRepository = module.get<Repository<CartProductEntity>>(
      getRepositoryToken(CartProductEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productService).toBeDefined();
    expect(cartProductRepository).toBeDefined();
  });
});
