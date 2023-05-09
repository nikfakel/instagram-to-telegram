import { Module } from '@nestjs/common';
import {InstagramApiService} from "./instagram-api.service";
import {InstagramDBService} from "./instagram-db.service";
import {InstagramController} from "./instagram.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {CreateInstagramSessionDto} from "./create-instagram-session.dto";
import {InstagramSession} from "./instagram-session.schema";

@Module({
  imports: [MongooseModule.forFeature([{
    name: InstagramSession.name,
    schema: CreateInstagramSessionDto
  }])],
  controllers: [InstagramController],
  providers: [
    InstagramApiService,
    InstagramDBService
  ],
})
export class InstagramModule {}
