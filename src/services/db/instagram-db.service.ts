import { Injectable, Logger } from '@nestjs/common';
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
    }
  }

  async setPosts(account: string, posts: TInstagramPost[]) {
    try {
      const batch = this.firebaseService.db.batch();

      posts.forEach((post) => {
        const docRef = this.firebaseService.db
          .collection('instagram')
          .doc(account)
          .collection('posts')
          .doc(post.id);
        batch.set(docRef, post);
      });

      this.logger.debug('POSTS WERE UPDATED');

      await batch.commit();
    } catch (e) {
      this.logger.error(e);
    }
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
    }
  }

  async getNextPost(userId: number, channel: string) {
    try {
      const userData = await this.firebaseService.db
        .collection('users')
        .doc(String(userId))
        .get();

      const user = userData.data() as TUser;
      const lastPostTimestamp = user?.parsers?.[channel].takenAtTimestamp;
      const instagramAccount = user?.parsers?.[channel].instagram;

      if (!lastPostTimestamp || !instagramAccount) {
        return new Error('Something went wrong in db (getInstagramPost)');
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
        this.logger.debug('No matching document');
        return {
          user: null,
          post: null,
        };
      } else {
        return {
          user,
          post: snapshot.docs.map((item) => item.data())[0] as TInstagramPost,
        };
      }
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getLastPublishedPost(userId: number, channel: string) {
    return {};
  }
}
