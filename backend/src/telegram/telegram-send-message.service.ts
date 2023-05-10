import {Injectable, Logger} from "@nestjs/common";
import {TelegramApiService} from "./telegram-api.service";
import {Cron} from "@nestjs/schedule";
import {TelegramMethod} from "../types/telegram";
import {InjectModel} from "@nestjs/mongoose";
import {InstagramPost} from "../instagram/instagram-post.schema";
import {Model} from "mongoose";

@Injectable()
export class TelegramSendMessagesService {
  constructor(
    private readonly telegramApiService: TelegramApiService,
    @InjectModel(InstagramPost.name) private readonly instagramPostModel: Model<InstagramPost>,
    ) {}

  private readonly logger = new Logger(TelegramSendMessagesService.name);

  async getPost() {
    try {
      const resp = await this.instagramPostModel.aggregate<InstagramPost>([
        {$match: { posted: false }},
        {$unwind: '$taken_at_timestamp'},
        {$sort: {'taken_at_timestamp': 1}},
        {$limit: 1},
      ])

      return resp && resp[0] || false;
    } catch (error) {
      this.logger.error(error)
      return false
    }
  }

  // @Cron('*/20 * * * * *')
  async handleCron() {
    const newPost = await this.getPost()

    if (newPost) {
      this.sendPost(newPost);
    }

    this.logger.debug(newPost);
  }

  sendPost(post: InstagramPost) {
    let data: {
      media?: string[];
      photo?: string;
      video?: string;
    } = {};
    let header = undefined;

    if (post.media && post.media.length > 0) {
      header = TelegramMethod.SendMediaGroup;
      data.media = [post.display_url, ...post.media]
    } else if (post.is_video) {
      header = TelegramMethod.SendVideo
      data.video = post.video_url
    } else {
      header = TelegramMethod.SendPhoto
      data.photo = post.display_url
    }

    try {
      this.telegramApiService.sendRequest(header, {
        chat_id: '@rihanna_instagram',
        caption: post.caption,
        ...data,
      });
    } catch (error) {
      this.logger.error(error)
    }
  }
}
