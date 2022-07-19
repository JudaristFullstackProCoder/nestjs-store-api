import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { USER_DEFAULTS_PERMISSIONS } from 'src/auth/perms/user';

export type UserDocument = User & Document<string>;

export const trimUserItemDocument = function trimUserItemDocument(
  user: UserDocument,
) {
  return user;
};

export const trimUserCollectionDocument = function trimUserItemDocument(
  user: UserDocument,
) {
  return user;
};

@Schema()
export class User {
  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.String })
  username: string;
  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.String })
  email: string;
  @Prop({ required: true, type: mongoose.Schema.Types.String, unique: true })
  password: string;
  @Prop({
    required: true,
    default: '__USER_ROLE__',
    enum: ['__USER_ROLE__'],
    type: mongoose.Schema.Types.String,
  })
  role: string;
  @Prop({
    required: true,
    default: USER_DEFAULTS_PERMISSIONS,
    type: mongoose.Schema.Types.Array,
  })
  permissions: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
