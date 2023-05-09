import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SendPost } from './send-post/send-post';
import {InstagramApiService} from "./instagram/instagram-api.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sendPostService: SendPost,
    private readonly instagramApiService: InstagramApiService
  ) {
    this.instagramApiService.getPosts();
    this.sendPostService.handleCron();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
