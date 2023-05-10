export enum TelegramMethod {
  SendPhoto = 'sendPhoto',
  SendMessage = 'sendMessage',
  SendVideo = 'sendVideo',
  SendMediaGroup = 'sendMediaGroup',
}

export type TelegramSuccessResponse = {
  ok: boolean;
  result: {
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
};
