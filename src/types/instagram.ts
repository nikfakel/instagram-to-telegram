import {IPaginatedPosts} from "insta-fetcher/dist/types/PaginatedPosts";
import {PurpleNode, Typename} from "insta-fetcher/dist/types";

type Link = string;
type Base64 = string;

export type InstagramPost = Pick<
  PurpleNode,
  '__typename'
  | 'id'
  | 'is_video'
  | 'video_url'
  | 'taken_at_timestamp'
  | 'product_type'
>;
