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

  getFireStore() {
    if (!this.app && !firebaseAdmin.apps.length) {
      try {
        const serviceAccount = require("../../dopqf-3576f476bf.json");
        this.app = firebaseAdmin.initializeApp({
          credential: firebaseAdmin.credential.cert(serviceAccount)
        })
        firebaseAdmin.firestore().settings({ignoreUndefinedProperties:true});
      } catch (error) {
        this.logger.error(error)
      }
    }

    return firebaseAdmin.firestore()
  }

  async initialize() {
    this.db = this.getFireStore();
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
