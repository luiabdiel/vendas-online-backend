import { PaymentType } from 'src/payment-status/enums/payment-type.enum';
import { PaymentEntity } from '../entities/payment.entity';

export const paymentMock: PaymentEntity = {
  createdAt: new Date(),
  discount: 99,
  finalPrice: 2813.45,
  id: 98321,
  price: 3871.2,
  statusId: PaymentType.Done,
  updatedAt: new Date(),
  type: '',
};
