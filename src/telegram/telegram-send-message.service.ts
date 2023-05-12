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

  async handleCron() {
    try {
      const newPost = await this.getPost()

      if (newPost) {
        this.sendPost(newPost);

        return newPost
      } else {
        return 'Error'
      }
    } catch(e) {
      this.logger.error(e);
      return e;
    }
  }

  async getPost() {
    try {
      return await this.firebaseServise.getInstagramPost();
    } catch (error) {
      this.logger.error(error)
    }
  }

  async sendPost(post: InstagramPost) {
    let data: {
      media?: string;
      photo?: string;
      video?: string;
    } = {};
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
        console.log(post);
        media = post.media.map(item => ({ type: 'photo', media: item }))
      }

      data.media = JSON.stringify(media)
    }

    try {
      const response = await this.telegramApiService.sendRequest(header, {
        chat_id: '@rihanna_instagram',
        caption: post.caption,
        ...data,
      });

      if (response.data.ok) {
        this.setPosted({
          postId: post.id,
          postedTimestamp: Date.now(),
          linkToTelegramMessage: response.data.result.message_id,
          linkToTelegramChat: response.data.result.chat.id
        })
      }
    } catch (error) {
      this.logger.error(error)
    }
  }

  async setPosted(messageData) {
    try {
      const post = await this.firebaseServise.setPosted(messageData)
    } catch(error) {
      this.logger.error(error);
    }
  }
}
