import { Body, Controller, Logger, Post } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
  private readonly logger: Logger = new Logger(TelegramController.name);

  constructor(private readonly telegramService: TelegramService) {}

  @Post('send-post')
  async sendPost(@Body() body: { userId: number; channel: string }) {
    const { userId, channel } = body;

    if (!userId || !channel) {
      return 'userId or channel is not exists in body';
    }

    try {
      return this.telegramService.sendPost(userId, channel);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
