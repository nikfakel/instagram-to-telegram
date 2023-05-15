import {Injectable, Logger} from "@nestjs/common";
import {igApi, getCookie} from "insta-fetcher";
import {InstagramDBService} from "./instagram-db.service";
import {InstagramPost} from "../types/instagram";
import {IPaginatedPosts} from "insta-fetcher/dist/types/PaginatedPosts";

@Injectable()
export class InstagramApiService {
  private readonly logger = new Logger(InstagramApiService.name);
  private ig: igApi;

  constructor(
    private readonly instagramDBService: InstagramDBService
  ) {}

  async connect() {
    const sessionId = await this.getSessionId();

    if (sessionId) {
      this.ig = new igApi(sessionId.id, false);
    } else {
      await this.setSessionId();
      await this.connect();
    }
  }

  async getSessionId() {
    return this.instagramDBService.getSessionId();
  }

  async setSessionId() {
    const instagramLogin = process.env.INSTAGRAM_LOGIN;
    const instagramPassword = process.env.INSTAGRAM_PASSWORD;
    const newSessionId = await getCookie(instagramLogin, instagramPassword);
    const timestamp = Date.now();

    await this.instagramDBService.setSessionId(newSessionId, timestamp)
  }

  async getPosts(account) {
    await this.connect();

    if (this.ig) {
      try {
        const response = await this.ig.fetchUserPostsV2(account);
        return this.savePosts(account, response)
      } catch(e) {
        this.logger.error(e);
        return e;
      }
    }
  }

  proceedPosts(paginatedPosts: IPaginatedPosts ): InstagramPost[] {
    return paginatedPosts.edges.map(({ node: post }) => {
      return {
        id: post.id,
        __typename: post.__typename,
        is_video: post.is_video,
        video_url: post.video_url,
        display_url: post.display_url,
        taken_at_timestamp: post.taken_at_timestamp,
        product_type: post.product_type,
        media: post.edge_sidecar_to_children
          ? post.edge_sidecar_to_children.edges.map(({node}) => node.display_url)
          : [],
        ...post?.edge_media_to_caption?.edges[0]?.node?.text && {
          caption: post.edge_media_to_caption.edges[0].node.text},
      }
    })
  }

  async savePosts(account, posts: IPaginatedPosts) {
    try {
      const updatedPosts = this.proceedPosts(posts);
      const response = await this.instagramDBService.setPosts(account, updatedPosts)
      this.logger.debug('POSTS WERE UPDATED')
      return updatedPosts;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async removePosts() {
    try {
      this.instagramDBService.removePosts()
    } catch(e) {
      this.logger.error(e)
    }
  }
}
