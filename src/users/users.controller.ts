import { Body, Controller, Logger, Post } from '@nestjs/common';
import { FirebaseService } from '../services/firebase.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly firebaseService: FirebaseService) {}
  @Post('get-users')
  async getUsers() {
    try {
      return this.firebaseService.getUsers();
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Post('get-user')
  async getUser(@Body() body: { userId: number }) {
    if (!body.userId) {
      return 'Set user id in post.body';
    }
    try {
      return this.firebaseService.getUser(body.userId);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
