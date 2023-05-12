import { Module } from '@nestjs/common';
import {TelegramApiService} from "./telegram-api.service";
import {TelegramController} from "./telegram.controller";
import {ConfigModule} from "@nestjs/config";
import {ScheduleModule} from "@nestjs/schedule";
import {HttpModule} from "@nestjs/axios";
import {TelegramSendMessagesService} from "./telegram-send-message.service";
import {FirebaseService} from "../services/firebase.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [TelegramController],
  providers: [
    TelegramApiService,
    TelegramSendMessagesService,
    FirebaseService
  ],
})
export class TelegramModule {}