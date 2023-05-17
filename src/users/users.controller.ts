import { Body, Controller, Logger, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}
  @Post('get-users')
  async getUsers() {
    try {
      return this.usersService.getUsers();
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
      return this.usersService.getUser(body.userId);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Post('save-new-channel')
  async saveNewChannel(
    @Body() body: { userId: number; channel: string; instagram: string },
  ) {
    const { userId, channel, instagram } = body;

    if (!userId || !channel || !instagram) {
      return 'userId, channel or instagram is not exist in body';
    }

    try {
      return this.usersService.saveNewChannel(userId, channel, instagram);
    } catch (e) {
      return this.logger.error(e);
    }
  }
}
