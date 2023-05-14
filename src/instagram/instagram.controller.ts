import {Controller, Get, Logger} from "@nestjs/common";
import {InstagramApiService} from "./instagram-api.service";
import {Cron} from "@nestjs/schedule";
import {isProduction} from "../helpers/node-env";

@Controller()
export class InstagramController {
  private readonly logger = new Logger(InstagramApiService.name);

  constructor(
    private readonly instagramApiService: InstagramApiService,
  ) {
    // this.getPosts();
  }

  @Cron('0 */30 * * * *')
  async getPosts() {
    try {
      if (isProduction()) {
        await this.instagramApiService.getPosts();
      } else {
        this.logger.debug('get posts')
      }
    } catch(e) {
      this.logger.error(e)
    }
  }



  @Get('get-posts')
  async getPostsManual() {
    try {
      const response = await this.instagramApiService.getPosts();
      console.log(response);
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
