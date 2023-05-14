import {Controller, Get, Logger} from "@nestjs/common";
import {TelegramSendMessagesService} from "./telegram-send-message.service";
import {Cron} from "@nestjs/schedule";
import {isProduction} from "../helpers/node-env";

@Controller()
export class TelegramController {
  private readonly logger: Logger = new Logger(TelegramController.name);

  constructor(
    private readonly telegramSendMessageService: TelegramSendMessagesService,
  ) {
    // this.telegramSendMessageService.sendPost();
  }

  // cron doesnt work on my server automatically
  // @Cron('0 */1 * * * *')
  async sendPost() {
    if (isProduction()) {
      try {
        this.telegramSendMessageService.sendPost();
      } catch(e) {
        this.logger.error(e);
      }
    } else {
      this.logger.debug('sendPost');
    }
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
