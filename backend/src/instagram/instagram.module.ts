import { Module } from '@nestjs/common';
import {InstagramApiService} from "./instagram-api.service";
import {InstagramDBService} from "./instagram-db.service";
import {InstagramController} from "./instagram.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {InstagramSession, InstagramSessionSchema} from "./instagram-session.schema";
import {ConfigModule} from "@nestjs/config";
import {ScheduleModule} from "@nestjs/schedule";
import {HttpModule} from "@nestjs/axios";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: InstagramSession.name,
      schema: InstagramSessionSchema
    }]),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [InstagramController],
  providers: [
    InstagramApiService,
    InstagramDBService
  ],
})
export class InstagramModule {}
