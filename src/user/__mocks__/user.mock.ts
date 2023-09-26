import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  cpf: '99999999999',
  createdAt: new Date(),
  email: 'emailmock@email.com',
  id: 43242,
  name: 'nameMock',
  password: 'passwordMock',
  phone: '99999999999',
  typeUser: UserType.User,
  updatedAt: new Date(),
};
