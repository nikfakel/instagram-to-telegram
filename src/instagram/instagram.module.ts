import { Module } from '@nestjs/common';
import { InstagramService } from './instagram.service';
import { InstagramDBService } from '../services/db/instagram-db.service';
import { InstagramController } from './instagram.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { FirebaseService } from '../services/firebase.service';

@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  controllers: [InstagramController],
  providers: [InstagramService, InstagramDBService, FirebaseService],
})
export class InstagramModule {}
