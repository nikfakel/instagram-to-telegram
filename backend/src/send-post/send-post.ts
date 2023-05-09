import {Injectable, Logger} from '@nestjs/common';
import {Cron} from "@nestjs/schedule";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class SendPost {
  constructor(private readonly configService: ConfigService) {
  }
  private readonly logger = new Logger(SendPost.name);

  @Cron('*/4 * * * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 4');
  }

  sendPost() {
    const telegramToken = this.configService.get('TELEGRAM_TOKEN')
    this.logger.debug(telegramToken)
  }
}
