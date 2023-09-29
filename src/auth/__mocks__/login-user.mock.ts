import { userEntityMock } from '../../user/__mocks__/user.mock';
import { LoginDto } from '../dtos/login.dto';

export const loginUserMock: LoginDto = {
  email: userEntityMock.email,
  password: '$2b$10$vFb20V/PmZUpFznH.UDVqup./Y5l4L57MDzpTS4s.olTZU8tW5AgC',
};
