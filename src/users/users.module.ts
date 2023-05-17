import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { FirebaseService } from '../services/firebase.service';

@Module({
  controllers: [UsersController],
  providers: [FirebaseService],
})
export class UsersModule {}
