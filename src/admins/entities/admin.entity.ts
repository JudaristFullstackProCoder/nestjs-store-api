import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ADMIN_DEFAULT_PERMISSIONS } from 'src/auth/perms/admin';

export type AdminDocument = Admin & Document<string>;

export const trimAdminItemDocument = function trimAdminItemDocument(
  user: AdminDocument,
) {
  return user;
};

export const trimAdminCollectionDocument = function trimAdminCollectionDocument(
  user: AdminDocument,
) {
  return user;
};

@Schema()
export class Admin {
  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.String })
  username: string;
  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.String })
  email: string;
  @Prop({ required: true, type: mongoose.Schema.Types.String, unique: true })
  password: string;
  @Prop({
    required: true,
    default: '__ADMIN_ROLE__',
    enum: ['__ADMIN_ROLE__'],
    type: mongoose.Schema.Types.String,
  })
  role: string;
  @Prop({
    required: true,
    default: ADMIN_DEFAULT_PERMISSIONS,
    type: mongoose.Schema.Types.Array,
  })
  permissions: string[];
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
