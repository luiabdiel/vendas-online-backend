import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';

export interface ReturnLoginDto {
  user: ReturnUserDto;
  accessToken: string;
}
