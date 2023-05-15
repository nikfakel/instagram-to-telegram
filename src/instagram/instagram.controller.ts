import {Controller, Get, Logger, Query} from "@nestjs/common";
import {InstagramApiService} from "./instagram-api.service";

@Controller()
export class InstagramController {
  private readonly logger = new Logger(InstagramApiService.name);

  constructor(
    private readonly instagramApiService: InstagramApiService,
  ) {}

  @Get('inst-auth')
  async authInst() {
    this.instagramApiService.setSessionId();
  }

  @Get('get-posts')
  async getPostsManual(@Query() query: { [key: string]: string }) {
    console.log(query);
    try {
      if (!query.account) {
        throw new Error('Query has no account');
      }

      const response = await this.instagramApiService.getPosts(query.account);
      this.logger.debug('getPostsManual in InstagramController');
      this.logger.debug(response);
      return response;
    } catch(e) {
      this.logger.error(e)
      return e;
    }
  }

  @Get('remove-posts')
  async removePosts() {
    try {
      this.instagramApiService.removePosts();

      return 'Posts removed'
    } catch(e) {
      this.logger.error(e)
    }
  }
}

// sessionid=59577419748%3AbdtDsnI78TroeG%3A1%3AAYeqBhsMY4qTwAutxlXpB4rMmlZQDeKPFFPKULHesA; ds_user_id=59577419748; csrftoken=X5NerSxXf3OCB6Km43e4QynchLHTXU2V
