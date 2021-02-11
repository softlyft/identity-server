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

  @Prop()
  telecom: [{ countryCode: string, number: string, use: string, verified: boolean }];

  @Prop()
  address: [{ use: string, number: string, line: string, city: string, state: string, country: string, verified: boolean }];

  @Prop({ select: false, required: true })
  salt: string;

  @Prop({ select: false, required: true })
  hash: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  gender: string;

  @Prop({ default: true })
  active: boolean;

  @Prop()
  maritalStatus: string;

  @Prop()
  birthDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);