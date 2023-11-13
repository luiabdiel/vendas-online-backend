import { paymentPixMock } from '../../payment/__mocks__/payment-pix.mock';
import { addressMock } from '../../address/__mocks__/address.mock';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { paymentCreditCardMock } from '../../payment/__mocks__/payment-credit-card.mock';

export const createOrderPixMock: CreateOrderDto = {
  addressId: addressMock.id,
  codePix: paymentPixMock.code,
  datePayment: '2023-11-13',
};

export const createOrderCreditCardMock: CreateOrderDto = {
  addressId: addressMock.id,
  amountPayments: paymentCreditCardMock.amountPayments,
};
