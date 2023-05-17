import { Body, Controller, Logger, Post } from '@nestjs/common';
import { InstagramService } from './instagram.service';

@Controller('instagram')
export class InstagramController {
  private readonly logger = new Logger(InstagramService.name);

  constructor(private readonly instagramService: InstagramService) {}

  @Post('set-session')
  async setSession() {
    try {
      this.instagramService.setSessionId();
    } catch (e) {
      this.logger.error(e);
    }
  }
  @Post('get-last-published-post')
  async getLastPublishedPost(
    @Body() body: { userId: number; channel: string },
  ) {
    const { userId, channel } = body;
    if (!userId || !channel) {
      return 'userId or channel are not found';
    }

    try {
      return await this.instagramService.getLastPublishedPost(userId, channel);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Post('get-next-post')
  async getNextPost(@Body() body: { userId: number; channel: string }) {
    const { userId, channel } = body;
    console.log(userId, channel);
    if (!userId || !channel) {
      return 'userId or channel are not found';
    }

    try {
      return await this.instagramService.getNextPost(userId, channel);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Post('get-posts')
  async getPosts(@Body() body: { instagram: string }) {
    try {
      const { instagram } = body;

      if (!instagram) {
        return 'instagram doesnt exist in body';
      }

      return await this.instagramService.getPosts(instagram);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Post('fetch-posts')
  async getAndSavePosts(@Body() body: { instagram: string }) {
    try {
      if (!body.instagram) {
        return new Error('Body has no instagram account');
      }

      const response = await this.instagramService.fetchPosts(body.instagram);
      this.logger.debug('getPostsManual in InstagramController');
      this.logger.debug(response);
      return response;
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  @Post('remove-posts')
  async removePosts() {
    try {
      this.instagramService.removePosts();

      return 'Posts removed';
    } catch (e) {
      this.logger.error(e);
    }
  }
}
