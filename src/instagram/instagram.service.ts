import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { getCookie, igApi } from 'insta-fetcher';
import { InstagramDBService } from '../services/db/instagram-db.service';
import { TInstagramPost } from '../types/instagram';
import { IPaginatedPosts } from 'insta-fetcher/dist/types/PaginatedPosts';

@Injectable()
export class InstagramService {
  private readonly logger = new Logger(InstagramService.name);
  private ig: igApi;

  constructor(private readonly instagramDBService: InstagramDBService) {}

  private async connect() {
    let connectCount = 0;
    try {
      const sessionId = await this.getSessionId();

      if (connectCount > 2) {
        throw new InternalServerErrorException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Cannot connect to instagram (3 times)',
        });
      }
      connectCount++;

      if (sessionId) {
        this.ig = new igApi(sessionId.id, false);
      } else {
        await this.setSessionId();
        await this.connect();
      }
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getSessionId() {
    try {
      return this.instagramDBService.getSessionId();
    } catch (e) {
      this.logger.error(e);
    }
  }

  async setSessionId() {
    try {
      const instagramLogin = process.env.INSTAGRAM_LOGIN;
      const instagramPassword = process.env.INSTAGRAM_PASSWORD;
      if (!instagramLogin || !instagramPassword) {
        throw new InternalServerErrorException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Cannot find env variables',
        });
      }

      const newSessionId = (await getCookie(
        instagramLogin,
        instagramPassword,
      )) as string;

      const timestamp = Date.now();

      await this.instagramDBService.setSessionId(newSessionId, timestamp);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getPosts(instagram: string) {
    try {
      return this.instagramDBService.getPosts(instagram);
    } catch (e) {
      this.logger.error(e);
    }
  }
  async fetchPosts(instagram: string) {
    await this.connect();

    if (this.ig) {
      try {
        const response = await this.ig.fetchUserPostsV2(instagram);

        return this.savePosts(instagram, response);
      } catch (e) {
        this.logger.error(e);
        return e;
      }
    }
  }

  async savePosts(instagramAccount: string, posts: IPaginatedPosts) {
    try {
      const newPosts = this.proceedPosts(posts);
      await this.instagramDBService.setPosts(instagramAccount, newPosts);
      await this.instagramDBService.setPostsLastFetch(instagramAccount);

      return newPosts;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async removePosts() {
    try {
      this.instagramDBService.removePosts();
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getNextPost(userId: number, channel: string) {
    try {
      return this.instagramDBService.getNextPost(userId, channel);
    } catch (e) {
      this.logger.error(e);
    }
  }
  async getLastPublishedPost(userId: number, channel: string) {
    try {
      return this.instagramDBService.getLastPublishedPost(userId, channel);
    } catch (e) {
      this.logger.error(e);
    }
  }

  private proceedPosts(paginatedPosts: IPaginatedPosts): TInstagramPost[] {
    return paginatedPosts.edges.map(({ node: post }) => {
      // error in library, display_resources is exist
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { display_resources } = post;
      return {
        id: post.id,
        __typename: post.__typename,
        product_type: post.product_type,
        is_video: post.is_video,
        video_url: post.video_url,
        dash_info: post.dash_info,
        display_url: post.display_url,
        taken_at_timestamp: post.taken_at_timestamp,
        dimensions: post.dimensions,
        display_resources: !post.hasOwnProperty('display_resources')
          ? []
          : display_resources,
        ...(post?.edge_media_to_caption?.edges[0]?.node?.text && {
          caption: post.edge_media_to_caption.edges[0].node.text,
        }),
        text: post.edge_media_to_caption.edges[0].node.text || '',
        media: post.edge_sidecar_to_children
          ? post.edge_sidecar_to_children.edges.map(({ node }) => ({
              id: node.id,
              is_video: node.is_video,
              video_url: node.video_url,
              dash_info: node.dash_info,
              display_url: node.display_url,
              dimensions: node.dimensions,
              display_resources: node.display_resources,
            }))
          : [],
      };
    });
  }
}
