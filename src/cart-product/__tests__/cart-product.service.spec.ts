import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from '../cart-product.service';
import { ProductService } from '../../product/product.service';
import { Repository } from 'typeorm';
import { CartProductEntity } from '../entities/cart-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../../product/__mocks__/product.mock';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { cartMock } from '../../cart/__mocks__/cart.mock';
import { insertCartMock } from '../../cart/__mocks__/insert-cart.mock';
import { cartProductMock } from '../__mock__/cart-product.mock';
import { NotFoundException } from '@nestjs/common';

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
            findProductById: jest.fn().mockResolvedValue(productMock),
          },
        },
        {
          provide: getRepositoryToken(CartProductEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cartProductMock),
            save: jest.fn().mockResolvedValue(cartProductMock),
            delete: jest.fn().mockResolvedValue(returnDeleteMock),
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

  it('should return delete result after delete product', async () => {
    const deleteResult = await service.deleteProductCart(
      productMock.id,
      cartMock.id,
    );

    expect(deleteResult).toEqual(returnDeleteMock);
  });

  it('should return error in exception delete', async () => {
    jest.spyOn(cartProductRepository, 'delete').mockRejectedValue(new Error());

    expect(
      service.deleteProductCart(productMock.id, cartMock.id),
    ).rejects.toThrowError();
  });

  it('should return CartProduct after create', async () => {
    const productCart = await service.createProductInCart(
      insertCartMock,
      cartMock.id,
    );

    expect(productCart).toEqual(cartProductMock);
  });

  it('should return error in exception create', async () => {
    jest.spyOn(cartProductRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.createProductInCart(insertCartMock, cartMock.id),
    ).rejects.toThrow();
  });

  it('should return CartProduct if exist', async () => {
    const productCart = await service.verifyProductInCart(
      productMock.id,
      cartMock.id,
    );

    expect(productCart).toEqual(cartProductMock);
  });

  it('should return error if not found', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockResolvedValue(undefined);

    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return error in exeception verifyProductInCart', async () => {
    jest.spyOn(cartProductRepository, 'findOne').mockRejectedValue(new Error());

    expect(
      service.verifyProductInCart(productMock.id, cartMock.id),
    ).rejects.toThrow(Error);
  });
});
