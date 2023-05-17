import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersDBService } from '../services/db/users-db.service';
import { FirebaseService } from '../services/firebase.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersDBService, FirebaseService],
})
export class UsersModule {}
