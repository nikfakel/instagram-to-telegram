import {Injectable, Logger} from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import {InstagramPost, InstagramSession} from "../types/instagram";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class FirebaseService {
  private db: firebaseAdmin.firestore.Firestore;
  private app: ReturnType<typeof firebaseAdmin.initializeApp>
  private readonly logger = new Logger(FirebaseService.name);

  constructor(
    private readonly configService: ConfigService
  ) {
    this.initialize();
  }

  async initialize() {
    this.db = this.getFireStore();
  }

  getFireStore() {
    this.logger.debug('PROCESSENV');
    console.log('PROCESSENV console.log');
    this.logger.debug(this.configService.get('PROJECT_ID'));
    this.logger.debug(this.configService.get('CLIENT_EMAIL'));
    this.logger.debug(process.env);
    this.logger.debug(process.env.PROJECT_ID);
    this.logger.debug(process.env.CLIENT_EMAIL);

    if (!this.app && !firebaseAdmin.apps.length) {
      try {
        const serviceAccount = {
          projectId: process.env.PROJECT_ID,
          privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
          clientEmail: process.env.CLIENT_EMAIL,
        }
        this.app = firebaseAdmin.initializeApp({
          credential: firebaseAdmin.credential.cert(serviceAccount),
          databaseURL: "https://memellindb-default-rtdb.firebaseio.com",
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

  async saveInstagramPosts(posts) {
    try {
      const batch = this.db.batch();

      posts.forEach(post => {
        const docRef = this.db.collection('posts').doc(post.id);
        this.logger.debug(post.id, docRef)
        batch.set(docRef, post);
      });

      const writes = await batch.commit();
      this.logger.debug(writes);
    } catch(e) {
      this.logger.error(e);
    }
  }

  async getInstagramPost() {
    try {
      const snapshot = await this.db.collection('posts')
        .where('posted', '==', false)
        .orderBy('taken_at_timestamp', 'desc')
        .limit(1)
        .get();

      console.log('post');
      if (snapshot.empty) {
        this.logger.debug('No matching document');
        return;
      } else {
        return Object.values(snapshot)[0] as InstagramPost;
      }
    } catch(e) {
      this.logger.error(e);
    }
  }

  async setPosted({ postId, postedTimestamp, linkToTelegramMessage }) {
    try {
      await this.db.collection('posts').doc(postId)
        .update({posted: true, postedTimestamp, linkToTelegramMessage});
    } catch(e) {
      this.logger.error(e);
    }
  }
}
