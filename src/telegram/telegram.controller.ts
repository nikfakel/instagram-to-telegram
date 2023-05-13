import {Controller, Get} from "@nestjs/common";
import {TelegramSendMessagesService} from "./telegram-send-message.service";
import {Cron} from "@nestjs/schedule";

@Controller()
export class TelegramController {
  constructor(private readonly telegramSendMessageService: TelegramSendMessagesService) {
    // this.telegramSendMessageService.sendPost();
  }

  @Cron('0 */1 * * * *')
  async sendPost() {
    this.telegramSendMessageService.sendPost();
  }

  @Get('get-post')
  async getNextPost() {
    const response = this.telegramSendMessageService.getPost();
    console.log(response);
    return response;
  }

  @Get('send-post')
  async sendPostManual() {
    this.sendPost();
  }
}
