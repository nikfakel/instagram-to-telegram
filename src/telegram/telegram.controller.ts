import {Controller, Get, Logger, Post} from "@nestjs/common";
import {TelegramSendMessagesService} from "./telegram-send-message.service";
import {isProduction} from "../helpers/node-env";
import {FirebaseService} from "../services/firebase.service";
import {Update} from "typegram";

@Controller()
export class TelegramController {
  private readonly logger: Logger = new Logger(TelegramController.name);

  constructor(
    private readonly telegramSendMessageService: TelegramSendMessagesService,
    private readonly firebaseService: FirebaseService
  ) {}

  @Get('save-channel')
  async saveChanges() {
    try {
      return this.firebaseService.saveNewChannel({
        userId: 246047689,
        channel: 'other_channel',
        instagram: 'memellin02'
      });
    } catch(e) {
      return this.logger.error(e)
    }
  }

  @Get('get-post')
  async getNextPost() {
    try {
      const response = this.telegramSendMessageService.getPost(12312893818, 'other_channel');
    } catch(e) {
      this.logger.error(e);
    }
  }

  @Get('send-post')
  async sendPostManual() {
    try {
      return this.telegramSendMessageService.sendPost(12312893818, 'other_channel');
    } catch(e) {
      this.logger.error(e)
    }
  }

  @Post(process.env.WEBHOOKS_URI)
  async onTelegramWebhook(update: Update, token: string) {
    this.logger.debug('onTelegramWebhook')
    this.logger.debug(update);
    this.logger.debug(token);
  }
}
