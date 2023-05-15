import {Injectable, Logger} from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import {InstagramPost, InstagramSession} from "../types/instagram";

@Injectable()
export class FirebaseService {
  private db: firebaseAdmin.firestore.Firestore;
  private app: ReturnType<typeof firebaseAdmin.initializeApp>
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
          privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
          clientEmail: process.env.CLIENT_EMAIL,
        }
        this.app = firebaseAdmin.initializeApp({
          credential: firebaseAdmin.credential.cert(serviceAccount),
          databaseURL: process.env.DATABASE_URL,
        });

        firebaseAdmin.firestore().settings({
          ignoreUndefinedProperties:true
        });
      } catch (error) {
        this.logger.error(error)
      }
    }

    return firebaseAdmin.firestore()
  }

  async getInstagramSession() {
    try {
      const snapshot = await this.db.collection('sessionId').doc('id').get();
      return snapshot.data() as InstagramSession;
    } catch(e) {
      this.logger.error(e);
    }
  }

  async setInstagramSession(id, timestamp) {
    try {
      await this.db.collection('sessionId').doc('id').update({
        id, timestamp
      });
    } catch(e) {
      this.logger.error(e);
    }
  }

  async saveInstagramPosts(account, posts) {
    try {
      const batch = this.db.batch();

      posts.forEach(post => {
        const docRef = this.db
          .collection('instagram')
          .doc(account)
          .collection('posts')
          .doc(post.id);
        batch.set(docRef, post);
      });

      const writes = await batch.commit();
    } catch(e) {
      this.logger.error(e);
    }
  }

  async getInstagramPost(userId) {
    try {
      const userData = await this.db
        .collection('users')
        .doc(userId)
        .get();

      const user = userData.data();
      const lastPostTimestamp = user.posted[user.instagram[0]].takenAtTimestamp;

      const snapshot = await this.db
        .collection('instagram')
        .doc(user.instagram[0])
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
          post: snapshot.docs.map((item) => item.data())[0] as InstagramPost
        }
      }
    } catch(e) {
      this.logger.error(e);
    }
  }

  async setPosted(
    {
      instagram,
      user,
      postId,
      takenAtTimestamp,
      postedTimestamp,
      linkToTelegramMessage,
      linkToTelegramChat
    }) {

    try {
      return await this.db
        .collection('users')
        .doc(user.id)
        .update({ [`posted.${instagram}`]: {
           postId, takenAtTimestamp, postedTimestamp, linkToTelegramMessage, linkToTelegramChat
        }});
    } catch(e) {
      this.logger.error(e);
      return e;
    }
  }

  async removePosts() {
    try {
      await this.db.collection('posts').listDocuments().then(val => {
        val.map((val) => {
          val.delete()
        })
      })
    } catch(e) {
      this.logger.error(e)
    }
  }
}
