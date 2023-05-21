import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InstagramSession, TInstagramPost } from '../../types/instagram';
import { FirebaseService } from '../firebase.service';
import { TUser } from '../../types/firebase';

@Injectable()
export class InstagramDBService {
  private readonly logger = new Logger(InstagramDBService.name);

  constructor(private readonly firebaseService: FirebaseService) {}

  async setSessionId(id: string, timestamp: number) {
    try {
      await this.firebaseService.db.collection('sessionId').doc('id').update({
        id,
        timestamp,
      });
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  async getSessionId() {
    try {
      const snapshot = await this.firebaseService.db
        .collection('sessionId')
        .doc('id')
        .get();
      return snapshot.data() as InstagramSession;
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  async setPosts(instagram: string, posts: TInstagramPost[]) {
    try {
      const batch = this.firebaseService.db.batch();

      posts.forEach((post) => {
        const docRef = this.firebaseService.db
          .collection('instagram')
          .doc(instagram)
          .collection('posts')
          .doc(post.id);
        batch.set(docRef, post);
      });

      this.logger.debug('POSTS WERE UPDATED');

      await batch.commit();
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  async setPostsLastFetch(instagram: string) {
    await this.firebaseService.db
      .collection('instagram')
      .doc(instagram)
      .update({
        lastFetch: Date.now(),
      });
  }

  async removePosts() {
    try {
      await this.firebaseService.db
        .collection('posts')
        .listDocuments()
        .then((val) => {
          val.map((val) => {
            val.delete();
          });
        });
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  async getNextPost(userId: number, channel: string) {
    try {
      const userData = await this.firebaseService.db
        .collection('users')
        .doc(String(userId))
        .get();

      const user = userData.data() as TUser;
      const lastPostTimestamp = user?.parsers?.[channel].takenAtTimestamp || 1;
      const instagramAccount = user?.parsers?.[channel].instagram;

      if (!instagramAccount) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Instagram is not set for parser',
        });
      }

      const snapshot = await this.firebaseService.db
        .collection('instagram')
        .doc(instagramAccount)
        .collection('posts')
        .where('taken_at_timestamp', '>', lastPostTimestamp)
        .orderBy('taken_at_timestamp', 'asc')
        .limit(1)
        .get();

      if (snapshot.empty) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'Cannot find post by ID',
        });
      } else {
        return snapshot.docs.map((item) => item.data())[0] as TInstagramPost;
      }
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  async getLastPublishedPost(userId: number, channel: string) {
    try {
      const userRef = await this.firebaseService.db
        .collection('users')
        .doc(String(userId))
        .get();

      const user = userRef.data();
      const postId = user?.parsers?.[channel].postId;
      const instagram = user?.parsers?.[channel].instagram;

      if (!postId) {
        throw new NotFoundException({
          status: HttpStatus.NOT_FOUND,
          error: 'There was no published posts yet',
        });
      }

      const postRef = await this.firebaseService.db
        .collection('instagram')
        .doc(instagram)
        .collection('posts')
        .doc(postId)
        .get();

      return await postRef.data();
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  async getPosts(instagram: string) {
    try {
      const postsRef = await this.firebaseService.db
        .collection('instagram')
        .doc(instagram)
        .collection('posts')
        .get();

      return postsRef.docs.map((item) => item.data());
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }
}
