import {Injectable, Logger} from "@nestjs/common";
import {TelegramApiService} from "./telegram-api.service";
import {TelegramMethod, TSetPosted, TTelegramPostToSend} from "../types/telegram";
import {FirebaseService} from "../services/firebase.service";
import {TInstagramPost} from "../types/instagram";
import {TUser} from "../types/firebase";

@Injectable()
export class TelegramSendMessagesService {
  private readonly logger = new Logger(TelegramSendMessagesService.name);

  constructor(
    private readonly telegramApiService: TelegramApiService,
    private readonly firebaseServise: FirebaseService,
    ) {}

  async sendPost(userId: number, channel: string) {
    try {
      const data = await this.getPost(userId, channel)

      if (data && data.user && data.post) {
        this.sendRequest(data.user, channel, data.post);

        return data.post
      } else {
        return 'New post not found'
      }
    } catch(e) {
      this.logger.error(e);
      return e;
    }
  }

  async getPost(userId: number, channel: string) {
    try {
      return await this.firebaseServise.getInstagramPost(userId, channel);
    } catch (error) {
      this.logger.error(error)
    }
  }

  async sendRequest(user: TUser, channel: string, post: TInstagramPost) {
    const { data, header } = this.createMessage(post);
    try {
      const response = await this.telegramApiService.sendRequest(header, {
        chat_id: '@rihanna_instagram',
        ...data,
      });

      if (response?.data.ok) {
        const linkToTelegramChat = Array.isArray(response.data.result)
          ? response.data.result[0].chat.id
          : response.data.result.chat.id;

        const linkToTelegramMessage = Array.isArray(response.data.result) ?
          response.data.result[0].message_id
          : response.data.result.message_id

        return this.setPosted({
          channel,
          user,
          data,
          linkToTelegramMessage,
          linkToTelegramChat,
        })
      }
    } catch (e) {
      this.logger.error(e, '', 'sendRequest')
      return e
    }
  }

  createMessage(post: TInstagramPost) {
    let data: TTelegramPostToSend = {
      id: post.id,
      caption: post.caption,
      takenAtTimestamp: post.taken_at_timestamp,
    };
    let header = undefined;
    let media = [];

    if (post.media && post.media.length === 0) {
      if (post.is_video) {
        header = TelegramMethod.SendVideo
        data.video = post.video_url
      } else {
        header = TelegramMethod.SendPhoto
        data.photo = post.display_url
      }
    } else {
      header = TelegramMethod.SendMediaGroup;

      if (post.is_video) {
        media = [{ type: 'photo', media: post.video_url}, ...post.media.map(item => ({ type: 'photo', media: item }))];
      } else {
        media = post.media.map(item => ({ type: 'photo', media: item }))
      }

      data.media = JSON.stringify(media)
    }

    return { data, header }
  }

  async setPosted(messageData: TSetPosted) {
    try {
      return await this.firebaseServise.setPosted(messageData)
    } catch(e) {
      this.logger.error(e);
      return e
    }
  }
}
