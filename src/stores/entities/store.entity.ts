import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type StoreDocument = Store & Document<string>;

@Schema()
export class Store {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({
    required: true,
    unique: true,
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    autopopulate: true,
  })
  owner: User;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
