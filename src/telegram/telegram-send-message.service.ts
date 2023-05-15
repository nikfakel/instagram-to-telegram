import {Injectable, Logger} from "@nestjs/common";
import {TelegramApiService} from "./telegram-api.service";
import {TelegramMethod} from "../types/telegram";
import {FirebaseService} from "../services/firebase.service";
import {InstagramPost} from "../types/instagram";

@Injectable()
export class TelegramSendMessagesService {
  private readonly logger = new Logger(TelegramSendMessagesService.name);

  constructor(
    private readonly telegramApiService: TelegramApiService,
    private readonly firebaseServise: FirebaseService,
    ) {}

  async sendPost(userId) {
    try {
      const {user, post} = await this.getPost(userId)

      if (user && post) {
        this.sendRequest(user, post);

        return post
      } else {
        return 'New post not found'
      }
    } catch(e) {
      this.logger.error(e);
      return e;
    }
  }

  async getPost(userId) {
    try {
      return await this.firebaseServise.getInstagramPost(userId);
    } catch (error) {
      this.logger.error(error)
    }
  }

  async sendRequest(user, post) {
    const { data, header } = this.createMessage(post);
    try {
      const response = await this.telegramApiService.sendRequest(header, {
        chat_id: '@rihanna_instagram',
        ...data,
      });

      if (response.data.ok) {
        const chatId = Array.isArray(response.data.result)
          ? response.data.result[0].chat.id
          : response.data.result.chat.id;

        return this.setPosted({
          instagram: user.instagram[0],
          user: user,
          postId: data.id,
          postedTimestamp: Date.now(),
          linkToTelegramMessage: response.data.result.message_id,
          linkToTelegramChat: chatId,
          takenAtTimestamp: data.takenAtTimestamp
        })
      }
    } catch (e) {
      this.logger.error(e, '', 'sendRequest')
      return e
    }
  }

  createMessage(post: InstagramPost) {
    let data: {
      id: string;
      media?: string;
      photo?: string;
      video?: string;
      caption?: string;
      takenAtTimestamp?: number;
    } = {
      id: post.id,
      caption: post.caption,
      takenAtTimestamp: post.taken_at_timestamp
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

  async setPosted(messageData) {
    try {
      return await this.firebaseServise.setPosted(messageData)
    } catch(e) {
      this.logger.error(e);
      return e
    }
  }
}
