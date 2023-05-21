import { Injectable, Logger } from '@nestjs/common';
import { TelegramApiService } from '../services/telegram-api.service';
import { TelegramMethod, TTelegramPostToSend } from '../types/telegram';
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
        const responseSendMessage = await this.sendPostToTelegramChannel(
          user,
          channel,
          post,
        );
        const responseSetPosted = await this.telegramDBService.setMessagePosted(
          responseSendMessage,
        );

        if (responseSetPosted) {
          return responseSetPosted;
        } else {
          return 'Something went wrong';
        }
      } else {
        return 'New post not found';
      }
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  async sendPostToTelegramChannel(
    user: TUser,
    channel: string,
    post: TInstagramPost,
  ) {
    const { data, header } = this.createMessage(post);

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

        return {
          channel,
          user,
          data,
          linkToTelegramMessage,
          linkToTelegramChat,
        };
      }
    } catch (e) {
      this.logger.error(e, '', 'sendRequest');
      return e;
    }
  }

  createMessage(post: TInstagramPost) {
    const data: TTelegramPostToSend = {
      id: post.id,
    };
    let header;
    let media = [];

    if (post.media && post.media.length === 0) {
      data.caption = post.caption;

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
          {
            type: 'video',
            media: post.video_url,
            caption: post.caption,
          },
          ...post.media.map((item) => ({
            type: item.is_video ? 'video' : 'photo',
            media: item.is_video ? item.video_url : item.display_url,
          })),
        ];
      } else {
        media = post.media.map((item, index) => ({
          type: item.is_video ? 'video' : 'photo',
          media: item.is_video ? item.video_url : item.display_url,
          ...(index < 1 && { caption: post.caption }),
        }));
      }

      data.media = JSON.stringify(media);
    }

    return { data, header };
  }
}
