export type TParser = {
  instagram: string;
  startedAt: number;
  isStopped: boolean;
  takenAtTimestamp: number;
  linkToTelegramChat: number;
  linkToTelegramMessage: string;
  postedTimestamp: number;
  postId: string;
};

export type TUser = {
  id: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  type: 'private';
  parsers?: {
    [key: string]: TParser;
  };
};
