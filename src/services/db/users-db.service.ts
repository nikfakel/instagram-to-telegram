import { Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from '../firebase.service';
import { TUser } from '../../types/firebase';

@Injectable()
export class UsersDBService {
  private readonly logger = new Logger(UsersDBService.name);
  constructor(private readonly firebaseService: FirebaseService) {}

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
      const userDataSnapshot = await this.firebaseService.db
        .collection('users')
        .doc(String(userId))
        .get();
      const userData = userDataSnapshot.data() as TUser;

      if (userData && userData.parsers && !userData.parsers[channel]) {
        await this.firebaseService.db
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

  async getUsers() {
    try {
      const usersSnapshot = await this.firebaseService.db
        .collection('users')
        .get();
      return usersSnapshot.docs.map((doc) => doc.data()) as TUser[];
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getUser(userId: number) {
    try {
      const userSnapshot = await this.firebaseService.db
        .collection('users')
        .doc(String(userId))
        .get();
      const user = userSnapshot.data();
      return user as TUser;
    } catch (e) {
      this.logger.error(e);
    }
  }

  async saveUser(userData: TUser) {
    try {
      const user = await this.firebaseService.db
        .collection('users')
        .doc(String(userData.id))
        .get();

      if (!user.exists) {
        await this.firebaseService.db
          .collection('users')
          .doc(String(userData.id))
          .set(userData);
      }
    } catch (e) {
      this.logger.error(e);
    }
  }

  async getActiveParsers(userId: number) {
    try {
      const userDataSnapshot = await this.firebaseService.db
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
}
