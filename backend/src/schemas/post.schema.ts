import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  __typename: string;

  @Prop()
  id: string;

  @Prop()
  is_video: boolean;

  @Prop()
  video_url: string;

  @Prop()
  taken_at_timestamp: number;

  @Prop()
  product_type: string;
}

export const CatSchema = SchemaFactory.createForClass(Post);
