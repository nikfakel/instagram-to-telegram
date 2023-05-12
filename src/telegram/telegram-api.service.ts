import { Injectable, Logger } from '@nestjs/common';
import {TelegramMethod, TelegramSuccessResponse} from '../types/telegram';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class TelegramApiService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  private readonly logger = new Logger(TelegramApiService.name);

  async sendRequest(
    method: TelegramMethod,
    data,
  ): Promise<AxiosResponse<TelegramSuccessResponse>> {
    try {
      const response = await this.httpService.axiosRef.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/${method}`,
        data,
      );
      return await response;
    } catch (error) {
      this.logger.error(error.response.data.description);
    }
  }
}
