import { Injectable, Logger } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { InstagramSession, TInstagramPost } from '../types/instagram';
import { TUser } from '../types/firebase';
import { TSetPosted } from '../types/telegram';

@Injectable()
export class FirebaseService {
  private db: firebaseAdmin.firestore.Firestore;
  private app: ReturnType<typeof firebaseAdmin.initializeApp>;
  private readonly logger = new Logger(FirebaseService.name);

  constructor() {
    this.initialize();
  }

  async initialize() {
    this.db = this.getFireStore();
  }

  getFireStore() {
    if (!this.app && !firebaseAdmin.apps.length) {
      try {
        const serviceAccount = {
          projectId: process.env.PROJECT_ID,
          privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
          clientEmail: process.env.CLIENT_EMAIL,
        };
        this.app = firebaseAdmin.initializeApp({
          credential: firebaseAdmin.credential.cert(serviceAccount),
          databaseURL: process.env.DATABASE_URL,
        });

        firebaseAdmin.firestore().settings({
          ignoreUndefinedProperties: true,
        });
      } catch (error) {
        this.logger.error(error);
      }
    }

    return firebaseAdmin.firestore();
  }

  async getInstagramSession() {
    try {
      const snapshot = await this.db.collection('sessionId').doc('id').get();
      return snapshot.data() as InstagramSession;
    } catch (e) {
      this.logger.error(e);
    }
  }

  async setInstagramSession(id: string, timestamp: number) {
    try {
      await this.db.collection('sessionId').doc('id').update({
        id,
        timestamp,
      });
    } catch (e) {
      this.logger.error(e);
    }
  }

  async saveInstagramPosts(account: string, posts: TInstagramPost[]) {
    try {
      const batch = this.db.batch();

      posts.forEach((post) => {
        const docRef = this.db
          .collection('instagram')
          .doc(account)
          .collection('posts')
          .doc(post.id);
        batch.set(docRef, post);
      });

      await batch.commit();
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getInstagramPost(userId: number, channel: string) {
    try {
      const userData = await this.db
        .collection('users')
        .doc(String(userId))
        .get();

      const user = userData.data() as TUser;
      const lastPostTimestamp = user?.parsers?.[channel].takenAtTimestamp;
      const instagramAccount = user?.parsers?.[channel].instagram;

      if (!lastPostTimestamp || !instagramAccount) {
        return new Error('Something went wrong in db (getInstagramPost)');
      }

      const wh = await this.db
        .collection('instagram')
        .doc(instagramAccount)
        .collection('posts')
        .where('taken_at_timestamp', '>', lastPostTimestamp)
        .get();

      const a = wh.docs.map((item) => item.data());
      console.log(a);

      const snapshot = await this.db
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

  async setPosted({
    channel,
    user,
    data,
    linkToTelegramMessage,
    linkToTelegramChat,
  }: TSetPosted) {
    try {
      const resp = await this.db
        .collection('users')
        .doc(String(user.id))
        .update({
          [`instagram.${channel}`]: {
            postId: data.id,
            takenAtTimestamp: data.takenAtTimestamp,
            linkToTelegramMessage,
            linkToTelegramChat,
            postedTimestamp: Date.now(),
          },
        });

      console.log(resp);
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }

  async removePosts() {
    try {
      await this.db
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

  async saveUser(userData: TUser) {
    try {
      const user = await this.db
        .collection('users')
        .doc(String(userData.id))
        .get();

      if (!user.exists) {
        await this.db
          .collection('users')
          .doc(String(userData.id))
          .set(userData);
      }
    } catch (e) {
      this.logger.error(e);
    }
  }

  async saveNewChannel({
    userId,
    channel,
    instagram,
  }: {
    userId: number;
    channel: string;
    instagram: string;
  }) {
    try {
      const userDataSnapshot = await this.db
        .collection('users')
        .doc(String(userId))
        .get();
      const userData = userDataSnapshot.data() as TUser;

      if (userData && userData.parsers && !userData.parsers[channel]) {
        await this.db
          .collection('users')
          .doc(String(userId))
          .update({
            [`parsers.${channel}`]: {
              instagram,
              startedAt: Date.now(),
              isStopped: false,
            },
          });

        return 'Channel was added';
      } else {
        return 'Channel already exists';
      }
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getActiveParsers(userId: number) {
    try {
      const userDataSnapshot = await this.db
        .collection('users')
        .doc(String(userId))
        .get();
      const user = userDataSnapshot.data() as TUser;

      if (user?.parsers) {
        return Object.entries(user?.parsers)
          .filter(([, value]) => !value.isStopped)
          .map(([key, value]) => ({
            channel: key,
            instagram: value.instagram,
          }));
      } else {
        [];
      }
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getUsers() {
    try {
      const usersSnapshot = await this.db.collection('users').get();
      return usersSnapshot.docs.map((doc) => doc.data()) as TUser[];
    } catch (e) {
      this.logger.error(e);
    }
  }
  async getUser(userId: number) {
    try {
      const userSnapshot = await this.db
        .collection('users')
        .doc(String(userId))
        .get();
      const user = userSnapshot.data();
      return user as TUser;
    } catch (e) {
      this.logger.error(e);
    }
  }
}
