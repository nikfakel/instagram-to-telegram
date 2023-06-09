import { Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from '../firebase.service';
import { TSetPosted } from '../../types/telegram';

@Injectable()
export class TelegramDBService {
  private readonly logger = new Logger(TelegramDBService.name);

  constructor(private readonly firebaseService: FirebaseService) {}

  async setMessagePosted({
    channel,
    user,
    data,
    takenAtTimestamp,
    linkToTelegramMessage,
    linkToTelegramChat,
  }: TSetPosted) {
    try {
      await this.firebaseService.db
        .collection('users')
        .doc(String(user.id))
        .update({
          [`parsers.${channel}`]: {
            instagram: user.parsers?.[channel].instagram,
            postId: data.id,
            takenAtTimestamp: takenAtTimestamp,
            linkToTelegramMessage,
            linkToTelegramChat,
            postedTimestamp: Date.now(),
          },
        });

      return data;
    } catch (e) {
      this.logger.error(e);
      return e;
    }
  }
}
