import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {FirebaseService} from "./services/firebase.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly firebaseService: FirebaseService
  ) {

  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getPost() {
    return this.firebaseService.getInstagramPost();
  }
}
