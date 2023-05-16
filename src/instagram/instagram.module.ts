import { Module } from '@nestjs/common';
import { InstagramApiService } from './instagram-api.service';
import { InstagramDBService } from './instagram-db.service';
import { InstagramController } from './instagram.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { FirebaseService } from '../services/firebase.service';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  controllers: [InstagramController],
  providers: [InstagramApiService, InstagramDBService, FirebaseService],
})
export class InstagramModule {}
