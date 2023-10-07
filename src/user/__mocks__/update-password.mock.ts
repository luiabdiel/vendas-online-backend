import { UpdatePasswordDto } from '../dtos/update-password.dto';

export const updatePasswordMock: UpdatePasswordDto = {
  lastPassword: 'abc',
  newPassword: 'jkdsab',
};

export const updatePasswordInvalidMock: UpdatePasswordDto = {
  lastPassword: 'dkjhas',
  newPassword: 'dkshajkd',
};
