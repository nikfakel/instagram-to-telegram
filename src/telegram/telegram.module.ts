import { Module } from '@nestjs/common';
import { TelegramApiService } from '../services/telegram-api.service';
import { TelegramController } from './telegram.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { TelegramService } from './telegram.service';
import { FirebaseService } from '../services/firebase.service';
import { TelegramBotController } from './telegram-bot.controller';
import { InstagramService } from '../instagram/instagram.service';
import { TelegramDBService } from '../services/db/telegram-db.service';
import { InstagramDBService } from '../services/db/instagram-db.service';
import { UsersService } from '../users/users.service';
import { UsersDBService } from '../services/db/users-db.service';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  controllers: [TelegramController, TelegramBotController],
  providers: [
    FirebaseService,
    TelegramService,
    TelegramApiService,
    TelegramDBService,
    InstagramService,
    InstagramDBService,
    UsersService,
    UsersDBService,
  ],
})
export class TelegramModule {}
