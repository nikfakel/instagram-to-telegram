import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SendPost } from './send-post/send-post';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sendPostService: SendPost,
  ) {
    this.sendPostService.handleCron();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
