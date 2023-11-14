import { orderMock } from '../../order/__mocks__/order.mock';
import { OrderProductEntity } from '../entities/order-product.entity';
import { productMock } from '../../product/__mocks__/product.mock';

export const orderProductMock: OrderProductEntity = {
  amount: 38271,
  createdAt: new Date(),
  id: 231,
  orderId: orderMock.id,
  price: 79.99,
  productId: productMock.id,
  updatedAt: new Date(),
};
