import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document<string>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop()
  password: string;
  @Prop()
  role: string;
  @Prop({ required: false, type: mongoose.Schema.Types.Mixed })
  image: Express.Multer.File;
}

export const UserSchema = SchemaFactory.createForClass(User);
