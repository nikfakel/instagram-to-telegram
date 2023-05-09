import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendPost } from './send-post/send-post';
import { TelegramApiService } from './telegram-api/telegram-api.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import {InstagramApiService} from "./instagram/instagram-api.service";
import {InstagramDBService} from "./instagram/instagram-db.service";
import { InstagramModule } from './instagram/instagram.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    HttpModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    InstagramModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SendPost,
    TelegramApiService,
    InstagramApiService,
    InstagramDBService,
  ],
})
export class AppModule {}
