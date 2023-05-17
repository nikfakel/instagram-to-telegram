import { Injectable, Logger } from '@nestjs/common';
import { TelegramApiService } from '../services/telegram-api.service';
import {
  TelegramMethod,
  TSetPosted,
  TTelegramPostToSend,
} from '../types/telegram';
import { TInstagramPost } from '../types/instagram';
import { TUser } from '../types/firebase';
import { InstagramService } from '../instagram/instagram.service';
import { TelegramDBService } from '../services/db/telegram-db.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class TelegramService {
  private readonly logger = new Logger(TelegramService.name);

  constructor(
    private readonly telegramApiService: TelegramApiService,
    private readonly telegramDBService: TelegramDBService,
    private readonly instagramService: InstagramService,
    private readonly usersService: UsersService,
  ) {}

  async sendPost(userId: number, channel: string) {
    try {
      const post = await this.instagramService.getNextPost(userId, channel);
      const user = await this.usersService.getUser(userId);

      if (post && user) {
        await this.sendRequest(user, channel, post);

        return 'Post was published';
      } else {
        return 'New post not found';
      }
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  async sendRequest(user: TUser, channel: string, post: TInstagramPost) {
    const { data, header } = this.createMessage(post);

    console.log(data);
    try {
      const response = await this.telegramApiService.sendRequest(header, {
        chat_id: `@${channel}`,
        ...data,
      });

      if (response?.data.ok) {
        const linkToTelegramChat = Array.isArray(response.data.result)
          ? response.data.result[0].chat.id
          : response.data.result.chat.id;

        const linkToTelegramMessage = Array.isArray(response.data.result)
          ? response.data.result[0].message_id
          : response.data.result.message_id;

        return this.telegramDBService.setMessagePosted({
          channel,
          user,
          data,
          linkToTelegramMessage,
          linkToTelegramChat,
        });
      }
    } catch (e) {
      this.logger.error(e, '', 'sendRequest');
      return e;
    }
  }

  createMessage(post: TInstagramPost) {
    const data: TTelegramPostToSend = {
      id: post.id,
      caption: post.caption,
      takenAtTimestamp: post.taken_at_timestamp,
    };
    let header;
    let media = [];

    if (post.media && post.media.length === 0) {
      if (post.is_video) {
        header = TelegramMethod.SendVideo;
        data.video = post.video_url;
      } else {
        header = TelegramMethod.SendPhoto;
        data.photo = post.display_url;
      }
    } else {
      header = TelegramMethod.SendMediaGroup;

      if (post.is_video) {
        media = [
          { type: 'photo', media: post.video_url },
          ...post.media.map((item) => ({ type: 'photo', media: item })),
        ];
      } else {
        media = post.media.map((item) => ({ type: 'photo', media: item }));
      }

      data.media = JSON.stringify(media);
    }

    return { data, header };
  }
}
