import { Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from '../firebase.service';
import { TSetPosted } from '../../types/telegram';

Injectable();
export class TelegramDBService {
  private readonly logger = new Logger(TelegramDBService.name);

  constructor(private readonly firebaseService: FirebaseService) {}

  async setMessagePosted({
    channel,
    user,
    data,
    linkToTelegramMessage,
    linkToTelegramChat,
  }: TSetPosted) {
    try {
      const resp = await this.firebaseService.db
        .collection('users')
        .doc(String(user.id))
        .update({
          [`parsers.${channel}`]: {
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
}
