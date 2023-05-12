import {Controller, Get} from "@nestjs/common";
import {TelegramSendMessagesService} from "./telegram-send-message.service";
import {Cron} from "@nestjs/schedule";

@Controller()
export class TelegramController {
  constructor(private readonly telegramSendMessageService: TelegramSendMessagesService) {
    // this.telegramSendMessageService.handleCron();
  }

  @Cron('* */30 * * * *')
  async sendPost() {
    this.telegramSendMessageService.handleCron();
  }

  @Get('send post')
  async sendPostManual() {
    this.sendPost();
  }
}
