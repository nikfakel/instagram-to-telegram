import {Injectable, Logger} from "@nestjs/common";
import {TInstagramPost} from "../types/instagram";
import {FirebaseService} from "../services/firebase.service";

@Injectable()
export class InstagramDBService {
  private readonly logger = new Logger(InstagramDBService.name);

  constructor(
    private readonly firebaseService: FirebaseService
  ) {}

  async setSessionId(id: string, timestamp: number) {
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

  async setPosts(instagramAccount: string, posts: TInstagramPost[]) {
    try {
      this.firebaseService.saveInstagramPosts(instagramAccount, posts);
    } catch(e) {
      this.logger.error(e)
    }
  }

  async removePosts() {
    try {
      this.firebaseService.removePosts();
    } catch(e) {
      this.logger.error(e)
    }
  }
}
