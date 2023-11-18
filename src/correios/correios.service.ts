import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { CityService } from '../city/city.service';
import { ReturnCepDtoExternal } from './dtos/return-cep-external.dto';

@Injectable()
export class CorreiosService {
  URL_CORREIOS = process.env.URL_CEP_CORREIOS;
  constructor(
    private readonly httpService: HttpService,
    private readonly cityService: CityService,
  ) {}

  async findAddressByCep(cep: string): Promise<ReturnCepDtoExternal> {
    const returnCep: ReturnCepDtoExternal = await this.httpService.axiosRef
      .get<ReturnCepDtoExternal>(this.URL_CORREIOS.replace('{CEP}', cep))
      .then((result) => {
        if (result.data.erro === 'true') {
          throw new NotFoundException('CEP not found');
        }

        return result.data;
      })
      .catch((erro: AxiosError) => {
        throw new BadRequestException(`Error in connection request ${erro}`);
      });

    const city = await this.cityService.findCityByName(
      returnCep.localidade,
      returnCep.uf,
    );

    console.log('city', city);

    return returnCep;
  }
}
