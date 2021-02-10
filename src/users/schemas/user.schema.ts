import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ select: false, required: true })
  salt: string;

  @Prop({ select: false, required: true })
  hash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);