import { TUser } from './firebase';

export enum TelegramMethod {
  SendPhoto = 'sendPhoto',
  SendMessage = 'sendMessage',
  SendVideo = 'sendVideo',
  SendMediaGroup = 'sendMediaGroup',
}

export type TelegramSuccessResponseResult = {
  message_id: number;
  sender_chat: {
    id: number;
    title: string;
    username: string;
    type: string;
  };
  chat: {
    id: number;
    title: string;
    username: string;
    type: string;
  };
  date: number;
  photo: {
    file_id: string;
    file_unique_id: string;
    file_size: number;
    width: number;
    height: number;
  }[];
  caption: string;
};

export type TelegramSuccessResponse = {
  ok: boolean;
  result: TelegramSuccessResponseResult | TelegramSuccessResponseResult[];
};

export type TTelegramUser = {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
  type: 'private';
  active_usernames?: string[];
};

export type TTelegramPostToSend = {
  id: string;
  caption?: string;
  takenAtTimestamp?: number;
  video?: string;
  photo?: string;
  media?: string;
};

export type TSetPosted = {
  channel: string;
  user: TUser;
  data: TTelegramPostToSend;
  linkToTelegramMessage: number;
  linkToTelegramChat: number;
};
