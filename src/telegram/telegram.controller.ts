import {Controller, Get, Logger, Post} from "@nestjs/common";
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
    try {
      this.logger.debug('isProduction() in TelegramController');
      this.logger.debug(isProduction())
      if (isProduction()) {
        this.telegramSendMessageService.sendPost({
          id: 12312893818
        });
      } else {
        this.logger.debug('sendPost') // skipp sending posts in dev mode
      }
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Get('get-post')
  async getNextPost() {
    try {
      const response = this.telegramSendMessageService.getPost({
        id: 12312893818
      });
    } catch(e) {
      this.logger.error(e);
    }
  }

  @Get('send-post')
  async sendPostManual() {
    try {
      return this.telegramSendMessageService.sendPost("12312893818");
    } catch(e) {
      this.logger.error(e)
    }
  }

  @Post(process.env.WEBHOOKS_URI)
  async onTelegramWebhook(update, token) {
    this.logger.debug('onTelegramWebhook')
    this.logger.debug(update);
    this.logger.debug(token);
  }
}
