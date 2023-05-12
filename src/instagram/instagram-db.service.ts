import {Injectable, Logger} from "@nestjs/common";
import {InstagramPost as InstagramPostType} from "../types/instagram";
import {FirebaseService} from "../services/firebase.service";

@Injectable()
export class InstagramDBService {
  private readonly logger = new Logger(InstagramDBService.name);

  constructor(
    private readonly firebaseService: FirebaseService
  ) {}

  async setSessionId(id, timestamp) {
    try {
      this.firebaseService.setInstagramSession(id, timestamp);
    } catch(e) {
      this.logger.error(e)
    }
  }

  async getSessionId() {
    try {
      return await this.firebaseService.getInstagramSession();
    } catch(e) {
      this.logger.error(e)
    }
  }

  async removeAllPosts() {
    // await this.instagramPostModel.deleteMany();
  }

  async setPosts(posts: InstagramPostType[]) {
    try {
      this.firebaseService.saveInstagramPosts(posts);
    } catch(e) {
      this.logger.error(e)
    }
  }
}
