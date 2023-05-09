import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SessionDocument = HydratedDocument<InstagramSession>;

@Schema({ collection: 'instagramSessions'})
export class InstagramSession {
  @Prop()
  id: string;

  @Prop()
  timestamp: string;
}

export const InstagramSessionSchema = SchemaFactory.createForClass(InstagramSession);
