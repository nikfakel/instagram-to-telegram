import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {Typename} from "insta-fetcher/dist/types";

export type InstagramPostDocument = HydratedDocument<InstagramPost>;

@Schema({ collection: 'instagramPosts' })
export class InstagramPost {
  @Prop({ unique: true })
  id: string;

  @Prop({ type: String, role: Typename })
  __typename: Typename;

  @Prop()
  is_video: boolean;

  @Prop()
  video_url?: string;

  @Prop()
  display_url?: string;

  @Prop()
  taken_at_timestamp: number;

  @Prop()
  product_type?: string;

  @Prop()
  caption?: string;

  @Prop()
  media?: string[];
}

export const InstagramPostSchema = SchemaFactory.createForClass(InstagramPost);
