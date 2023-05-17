import { Injectable, Logger } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  public db: firebaseAdmin.firestore.Firestore;
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
}
