import {PurpleNode} from "insta-fetcher/dist/types";

export type InstagramPost = Pick<
  PurpleNode,
  '__typename'
  | 'id'
  | 'is_video'
  | 'display_url'
  | 'video_url'
  | 'taken_at_timestamp'
  | 'product_type'
> & {
  media?: string[]; // from edge_sidecar_to_children
  caption?: string; // from edge_media_to_caption
}

export type InstagramSession = {
  id: string;
  timestamp: number;
}

