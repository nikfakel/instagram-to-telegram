import { Injectable, Logger } from '@nestjs/common';
import { UsersDBService } from '../services/db/users-db.service';
import { TUser } from '../types/firebase';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(private readonly userDBService: UsersDBService) {}

  async getUsers() {
    try {
      this.userDBService.getUsers();
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getUser(userId: number) {
    try {
      return this.userDBService.getUser(userId);
    } catch (e) {
      this.logger.error(e);
    }
  }
  async saveUser(user: TUser) {
    try {
      return this.userDBService.saveUser(user);
    } catch (e) {
      this.logger.error(e);
    }
  }
  async saveNewChannel(userId: number, channel: string, instagram: string) {
    try {
      this.userDBService.saveNewChannel({
        userId,
        channel,
        instagram,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getActiveParsers(userId: number) {
    try {
      return this.userDBService.getActiveParsers(userId);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
