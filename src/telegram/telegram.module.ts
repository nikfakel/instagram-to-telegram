import { Module } from '@nestjs/common';
import {TelegramApiService} from "./telegram-api.service";
import {TelegramController} from "./telegram.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import {ScheduleModule} from "@nestjs/schedule";
import {HttpModule} from "@nestjs/axios";
import {TelegramSendMessagesService} from "./telegram-send-message.service";
import {InstagramSession, InstagramSessionSchema} from "../instagram/instagram-session.schema";
import {InstagramPost, InstagramPostSchema} from "../instagram/instagram-post.schema";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    HttpModule,
    MongooseModule.forFeature([{
      name: InstagramPost.name,
      schema: InstagramPostSchema
    }]),
  ],
  controllers: [TelegramController],
  providers: [
    TelegramApiService,
    TelegramSendMessagesService
  ],
})
export class TelegramModule {}
