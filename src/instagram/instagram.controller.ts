import {Controller, Get, Logger, Post, Query} from "@nestjs/common";
import {InstagramApiService} from "./instagram-api.service";
import {FirebaseService} from "../services/firebase.service";

@Controller()
export class InstagramController {
  private readonly logger = new Logger(InstagramApiService.name);

  constructor(
    private readonly instagramApiService: InstagramApiService,
    private readonly firebaseService: FirebaseService,
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
  
  @Post('get-users')
  async getUsers() {
    try {
      return this.firebaseService.getUsers();
    } catch(e) {
      this.logger.error(e);
    }
  }
}
