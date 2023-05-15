export type TUser = {
  id: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  type: 'private';
  parsers?: {
    [key: string]: {
      instagram: string;
      startedAt: number;
      isStopped: boolean;
      takenAtTimestamp: number;
      linkToTelegramChat: string;
      linkToTelegramMessage: string;
      postedTimestamp: number;
    }
  }
}
