import {Controller, Logger} from "@nestjs/common";
import {InstagramApiService} from "./instagram-api.service";

@Controller()
export class InstagramController {
  private readonly logger = new Logger(InstagramApiService.name);

  constructor(
    private readonly instagramApiService: InstagramApiService
  ) {
    // this.getPosts();
  }

  async getPosts() {
    this.instagramApiService.getPosts();
  }
}
