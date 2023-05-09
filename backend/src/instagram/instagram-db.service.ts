import {Injectable, Logger} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {InstagramSession} from "./instagram-session.schema";
import {Model} from "mongoose";
import {CreateInstagramSessionDto} from "./create-instagram-session.dto";
import {InstagramPost} from "./instagram-post.schema";

@Injectable()
export class InstagramDBService {
  private readonly logger = new Logger(InstagramDBService.name);

  constructor(
    @InjectModel(InstagramSession.name) private readonly instagramSessionModel: Model<InstagramSession>,
    @InjectModel(InstagramPost.name) private readonly instagramPostModel: Model<InstagramPost>,
  ) {}

  async setSessionId(createInstagramSessionDto: CreateInstagramSessionDto): Promise<InstagramSession> {
    const createdSession = await this.instagramSessionModel.create(createInstagramSessionDto);
    return createdSession;
  }

  async getSessionId(): Promise<InstagramSession> {
    const session = this.instagramSessionModel.findOne().exec();

    return session;
  }

  async removeAllPosts() {
    await this.instagramPostModel.deleteMany();
  }

  async setPosts(posts: InstagramPost[]): Promise<{ success: boolean }> {
    try {
      const oldPosts = await this.instagramPostModel.find();
      const postsToAdd = posts.filter(newPost => !oldPosts.some(oldPost => oldPost.id === newPost.id))

      // this.logger.debug(postsToAdd);

      if (postsToAdd) {
        await this.instagramPostModel.insertMany(postsToAdd);
      }

      return {
        success: true
      };
    } catch (error) {
      this.logger.error(error);
    }
  }
}
