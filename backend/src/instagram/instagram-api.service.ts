import {Injectable, Logger} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";
import {igApi, getCookie} from "insta-fetcher";
import {InstagramDBService} from "./instagram-db.service";

@Injectable()
export class InstagramApiService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly instagramDBService: InstagramDBService
  ) {}

  private readonly logger = new Logger(InstagramApiService.name);
  private ig;

  async connect() {
    const sessionId = await this.getSessionId();
    this.logger.debug(sessionId)
    this.ig = new igApi(sessionId.id, false);
    this.logger.debug(this.ig)

    if (false) {
      return;
    } else {
      await this.saveNewSessionId();
    }
  }

  async getSessionId() {
    return this.instagramDBService.getSessionId();
  }

  async saveNewSessionId() {
    const instagramLogin = this.configService.get('INSTAGRAM_LOGIN');
    const instagramPassword = this.configService.get('INSTAGRAM_PASSWORD');
    const newSessionId = await getCookie(instagramLogin, instagramPassword);
    const timestamp = Date.now();

    await this.instagramDBService.create({ id: newSessionId as string, timestamp})
  }


  async getPosts() {
    await this.connect();

    const posts = await this.ig.fetchUserPostsV2('rihannaofficiall');
    this.logger.debug(posts);

      // const oldPosts = postsStore.get('posts.rihanna');
      // const newPosts = updatePosts(oldPosts, res.edges);
      // postsStore.put('posts.rihanna', newPosts);
  }
}
