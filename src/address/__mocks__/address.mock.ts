import { cityMock } from '../../city/__mocks__/city.mock';
import { AddressEntity } from '../entities/address.entity';
import { userEntityMock } from '../../user/__mocks__/user.mock';

export const addressMock: AddressEntity = {
  cep: '78327893',
  cityId: cityMock.id,
  complement: 'dajishbj',
  createdAt: new Date(),
  id: 32873,
  numberAddress: 37281631,
  updatedAt: new Date(),
  userId: userEntityMock.id,
};
