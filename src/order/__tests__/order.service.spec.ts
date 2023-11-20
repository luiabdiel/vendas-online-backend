import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './../order.service';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaymentService } from '../../payment/payment.service';
import { CartService } from '../../cart/cart.service';
import { OrderProductService } from '../../order-product/order-product.service';
import { ProductService } from '../../product/product.service';
import { orderMock } from '../__mocks__/order.mock';
import { userEntityMock } from '../../user/__mocks__/user.mock';
import { NotFoundException } from '@nestjs/common';
import { orderProductMock } from '../../order-product/__mocks__/order-product.mock';
import { createOrderPixMock } from '../__mocks__/create-order.mock';
import { paymentMock } from '../../payment/__mocks__/payment.mock';
import { productMock } from '../../product/__mocks__/product.mock';
import { cartProductMock } from '../../cart-product/__mock__/cart-product.mock';
import { cartMock } from './../../cart/__mocks__/cart.mock';

jest.useFakeTimers().setSystemTime(new Date('2023-11-14'));

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: Repository<OrderEntity>;
  let paymentService: PaymentService;
  let cartService: CartService;
  let orderProductService: OrderProductService;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: PaymentService,
          useValue: {
            createPayment: jest.fn().mockResolvedValue(paymentMock),
          },
        },
        {
          provide: CartService,
          useValue: {
            findCartByUserId: jest.fn().mockResolvedValue({
              ...cartMock,
              cartProduct: [cartProductMock],
            }),
            clearCart: jest.fn(),
          },
        },
        {
          provide: OrderProductService,
          useValue: {
            createOrderProduct: jest.fn().mockResolvedValue(orderProductMock),
          },
        },
        {
          provide: ProductService,
          useValue: {
            findAllProduct: jest.fn().mockResolvedValue([productMock]),
          },
        },
        {
          provide: getRepositoryToken(OrderEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([orderMock]),
            save: jest.fn().mockResolvedValue(orderMock),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    paymentService = module.get<PaymentService>(PaymentService);
    cartService = module.get<CartService>(CartService);
    orderProductService = module.get<OrderProductService>(OrderProductService);
    productService = module.get<ProductService>(ProductService);
    orderRepository = module.get<Repository<OrderEntity>>(
      getRepositoryToken(OrderEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(orderRepository).toBeDefined();
    expect(paymentService).toBeDefined();
    expect(cartService).toBeDefined();
    expect(orderProductService).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should return order in findOrdersByUserId', async () => {
    const spy = jest.spyOn(orderRepository, 'find');
    const orders = await service.findOrdersByUserId(userEntityMock.id);

    expect(orders).toEqual([orderMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      where: {
        userId: userEntityMock.id,
        id: undefined,
      },
      relations: {
        address: {
          city: {
            state: true,
          },
        },
        ordersProduct: {
          product: true,
        },
        payment: {
          paymentStatus: true,
        },
        user: false,
      },
    });
  });

  it('should return NotFoundException in find return empty', () => {
    jest.spyOn(orderRepository, 'find').mockResolvedValue([]);

    expect(service.findOrdersByUserId(userEntityMock.id)).rejects.toThrowError(
      NotFoundException,
    );
  });

  it('should return order in saveOrder', async () => {
    const spy = jest.spyOn(orderRepository, 'save');

    const order = await service.saveOrder(
      createOrderPixMock,
      userEntityMock.id,
      paymentMock,
    );

    expect(order).toEqual(orderMock);
    expect(spy.mock.calls[0][0]).toEqual({
      addressId: createOrderPixMock.addressId,
      date: new Date(),
      paymentId: paymentMock.id,
      userId: userEntityMock.id,
    });
  });

  it('should expection in error save', () => {
    jest.spyOn(orderRepository, 'save').mockRejectedValue(new Error());

    expect(
      service.saveOrder(createOrderPixMock, userEntityMock.id, paymentMock),
    ).rejects.toThrowError();
  });

  it('should return order in create order success', async () => {
    const spyCartService = jest.spyOn(cartService, 'findCartByUserId');
    const spyProductService = jest.spyOn(productService, 'findAllProduct');
    const spyCartServiceClear = jest.spyOn(cartService, 'clearCart');
    const spyOrderProductService = jest.spyOn(
      orderProductService,
      'createOrderProduct',
    );
    const spyPaymentService = jest.spyOn(paymentService, 'createPayment');

    const order = await service.createOrder(
      createOrderPixMock,
      userEntityMock.id,
    );

    expect(order).toEqual(orderMock);
    expect(spyCartService.mock.calls.length).toEqual(1);
    expect(spyProductService.mock.calls.length).toEqual(1);
    expect(spyCartServiceClear.mock.calls.length).toEqual(1);
    expect(spyOrderProductService.mock.calls.length).toEqual(1);
    expect(spyPaymentService.mock.calls.length).toEqual(1);
  });

  it('should return orders', async () => {
    const spy = jest.spyOn(orderRepository, 'find');
    const orders = await service.findAllOrders();

    expect(orders).toEqual([orderMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      relations: {
        user: true,
      },
    });
  });

  it('should error in not found', async () => {
    jest.spyOn(orderRepository, 'find').mockResolvedValue([]);

    expect(service.findAllOrders()).rejects.toThrowError(
      new NotFoundException('Orders not found'),
    );
  });
});
