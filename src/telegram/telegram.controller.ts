import {Controller} from "@nestjs/common";
import {TelegramSendMessagesService} from "./telegram-send-message.service";

@Controller()
export class TelegramController {
  constructor(private readonly telegramSendMessageService: TelegramSendMessagesService) {
    // this.telegramSendMessageService.handleCron();
  }
}
