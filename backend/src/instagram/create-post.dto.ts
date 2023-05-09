export class CreatePostDTO {
  readonly id: string;
  readonly __typename: string;
  readonly is_video: boolean;
  readonly video_url: string;
  readonly taken_at_timestamp: number;
  readonly product_type: string;
  readonly caption: string;
  readonly media: string[];
}
