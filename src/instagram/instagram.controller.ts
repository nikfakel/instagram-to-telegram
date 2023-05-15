import {Controller, Get, Logger, Query} from "@nestjs/common";
import {InstagramApiService} from "./instagram-api.service";

@Controller()
export class InstagramController {
  private readonly logger = new Logger(InstagramApiService.name);

  constructor(
    private readonly instagramApiService: InstagramApiService,
  ) {}

  @Get('get-posts')
  async getPostsManual(@Query() query: { [key: string]: string }) {
    try {
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
