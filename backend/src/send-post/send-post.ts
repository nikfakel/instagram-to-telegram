import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TelegramApiService } from '../telegram-api/telegram-api.service';
import { TelegramMethod } from '../types/telegram';

@Injectable()
export class SendPost {
  constructor(private readonly telegramApiService: TelegramApiService) {}

  private readonly logger = new Logger(SendPost.name);

  getPost() {
    return false;
  }

  @Cron('*/20 * * * * *')
  handleCron() {
    const newPost = this.getPost()

    if (newPost) {
      // this.sendPost();
    }

    this.logger.debug('sent');
  }

  sendPost() {
    try {
      this.telegramApiService.sendRequest(TelegramMethod.SendPhoto, {
        chat_id: '@rihanna_instagram',
        photo:
          'https://instagram.feoh8-1.fna.fbcdn.net/v/t51.2885-15/340839509_536936658622767_3545526465501447426_n.jpg?stp=dst-jpg_e15&_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=JCqmHhT7iK4AX_IpPqx&edm=APU89FABAAAA&ccb=7-5&oh=00_AfAzGv_i6Ka2nqneDuy0wZMMBQmYIvu0E9jqbroa2zuNRw&oe=645B6316&_nc_sid=86f79a',
        caption: 'caption',
      });
    } catch (error) {
      this.logger.error(error)
    }
  }
}
