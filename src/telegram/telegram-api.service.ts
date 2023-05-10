import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {TelegramMethod, TelegramSuccessResponse} from '../types/telegram';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class TelegramApiService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  private readonly logger = new Logger(TelegramApiService.name);

  async sendRequest(
    method: TelegramMethod,
    data,
  ): Promise<AxiosResponse<TelegramSuccessResponse>> {
    try {
      const response = await this.httpService.axiosRef.post(
        `https://api.telegram.org/bot${this.configService.get(
          'TELEGRAM_TOKEN',
        )}/${method}`,
        data,
      );
      return await response;
    } catch (error) {
      console.log(error.response.data.description);
    }
  }
}
