import { userEntityMock } from '../../user/__mocks__/user.mock';
import { ReturnLoginDto } from '../dtos/returnLogin.tdo';
import { jwtMock } from './jwt.mock';

export const returnLoginMock: ReturnLoginDto = {
  accessToken: jwtMock,
  user: userEntityMock,
};
