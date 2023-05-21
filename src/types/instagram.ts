import { DisplayResource, PurpleNode } from 'insta-fetcher/dist/types';
import { DashInfo } from 'insta-fetcher/dist/types/PostMetadata';

export type TMedia = {
  id: string;
  is_video: boolean;
  video_url: string;
  dash_info?: DashInfo;
  display_url: string;
  dimensions: {
    width: number;
    height: number;
  };
  display_resources: DisplayResource[];
};

export type TInstagramPost = Pick<
  PurpleNode,
  | 'id'
  | '__typename'
  | 'product_type'
  | 'is_video'
  | 'video_url'
  | 'dash_info'
  | 'display_url'
  | 'taken_at_timestamp'
  | 'dimensions'
> & {
  display_resources?: DisplayResource[];
  caption?: string; // from edge_media_to_caption
  text: string;
  media: TMedia[];
};

export type InstagramSession = {
  id: string;
  timestamp: number;
};
