import {Injectable, Logger} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {igApi, getCookie} from "insta-fetcher";
import {InstagramDBService} from "./instagram-db.service";
import {InstagramPost} from "../types/instagram";
import {IPaginatedPosts} from "insta-fetcher/dist/types/PaginatedPosts";
import {Typename} from "insta-fetcher/dist/types";

@Injectable()
export class InstagramApiService {
  private readonly logger = new Logger(InstagramApiService.name);
  private ig: igApi;

  constructor(
    private readonly configService: ConfigService,
    private readonly instagramDBService: InstagramDBService
  ) {}

  async connect() {
    const sessionId = await this.getSessionId();
    if (sessionId) {
      this.ig = new igApi(sessionId.id, false);
      this.logger.debug('connect')
      this.logger.debug(this.ig)
    } else {
      await this.saveNewSessionId();
      await this.connect();
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

    await this.instagramDBService.setSessionId({ id: newSessionId as string, timestamp})
  }

  async getPosts() {
    await this.connect();

    if (this.ig) {
      // await this.instagramDBService.removeAllPosts();
      const response = await this.ig.fetchUserPostsV2('rihannaofficiall');
      this.savePosts(response)
      this.logger.debug('POSTS WERE UPDATED')
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
        posted: false,
        ...post?.edge_media_to_caption?.edges[0]?.node?.text && {
          caption: post.edge_media_to_caption.edges[0].node.text},
        ...post.edge_sidecar_to_children && {
          media: post.edge_sidecar_to_children.edges.map(({node}) => node.display_url)},
      }
    })
  }

  async savePosts(posts: IPaginatedPosts) {
    try {
      const updatedPosts = this.proceedPosts(posts);
      const response = await this.instagramDBService.setPosts(updatedPosts)
      if (!response.success) {
        this.logger.error('Post was not saved');
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
