type Link = string;
type Base64 = string;

export type InstagramSession = {
  id: string;
  timestamp: number
}

interface ITagUser {
  node: {
    user: {
      full_name: string;
      followed_by_viewer: boolean;
      id: string;
      is_verified: boolean;
      profile_pic_url: Link;
      username: string;
    };
    x: number;
    y: number;
  };
}
interface IThumbnail {
  src: Link;
  config_width: number;
  config_height: number;
}

enum TypeName {
  GraphVideo,
  GraphImage,
  GraphSidecar,
}

enum ProductType {
  'clips',
}

type IRowInstagramPost = {
  __typename: TypeName;
  id: string;
  gating_info: null;
  fact_check_overall_rating: null;
  fact_check_information: null;
  media_overlay_info: null;
  sensitivity_friction_info: null;
  sharing_friction_info: {
    should_have_sharing_friction: boolean;
    bloks_app_url: null;
  };
  dimensions: { height: number; width: number };
  display_url: Link;
  display_resources: IThumbnail[];
  is_video: boolean;
  media_preview: Base64;
  tracking_token: string;
  has_upcoming_event: boolean;
  edge_media_to_tagged_user: {
    edges: ITagUser[];
  };
  dash_info: {
    is_dash_eligible: boolean;
    video_dash_manifest: null;
    number_of_qualities: number;
  };
  has_audio: boolean;
  video_url: Link;
  video_view_count: number;
  edge_media_to_caption: { edges: { node: { text: string } }[] };
  shortcode: string;
  edge_media_to_comment: {
    count: number;
    page_info: { has_next_page: boolean; end_cursor: string };
  };
  edge_media_to_sponsor_user: { edges: [] };
  is_affiliate: boolean;
  is_paid_partnership: boolean;
  comments_disabled: boolean;
  taken_at_timestamp: number;
  edge_media_preview_like: { count: number; edges: [] };
  owner: { id: string; username: string };
  location: null;
  nft_asset_info: null;
  viewer_has_liked: boolean;
  viewer_has_saved: boolean;
  viewer_has_saved_to_collection: boolean;
  viewer_in_photo_of_you: boolean;
  viewer_can_reshare: boolean;
  thumbnail_src: Link;
  thumbnail_resources: IThumbnail[];
  coauthor_producers: [];
  pinned_for_users: [];
  product_type: ProductType;
};

export type InstagramPost = Omit<
  IRowInstagramPost,
  | '__typename'
  | 'id'
  | 'is_video'
  | 'video_url'
  | 'taken_at_timestamp'
  | 'product_type'
>;
