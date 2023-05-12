import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InstagramModule } from './instagram/instagram.module';
import {TelegramModule} from "./telegram/telegram.module";
import {ConfigModule} from "@nestjs/config";
import {FirebaseService} from "./services/firebase.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/nest'),
    InstagramModule,
    TelegramModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    FirebaseService,
  ],
})
export class AppModule {}
