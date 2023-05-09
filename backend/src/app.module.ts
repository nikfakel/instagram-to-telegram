import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendPost } from './send-post/send-post';
import { TelegramApiService } from './telegram-api/telegram-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot(), ScheduleModule.forRoot(), HttpModule],
  controllers: [AppController],
  providers: [AppService, SendPost, TelegramApiService],
})
export class AppModule {}

console.log('s');
