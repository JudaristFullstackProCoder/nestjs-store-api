import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Store } from 'src/stores/entities/store.entity';
import { Variation } from 'src/variations/entities/variation.entity';
import { Option } from 'src/options/entities/option.entity';

export type ProductDocument = Product & Document<string>;

@Schema()
export class Product {
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  name: string;
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  description: string;
  @Prop({ required: true, type: mongoose.Schema.Types.Number })
  price: number;
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  longDescription: string;
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        autopopulate: false,
      },
    ],
  })
  shopkeeper: User;
  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'store',
        autopopulate: false,
      },
    ],
  })
  store: Store;
  @Prop({ required: false, type: mongoose.Schema.Types.Mixed })
  image: Express.Multer.File;
  @Prop({ required: false, type: [mongoose.Schema.Types.String] })
  images: Express.Multer.File[];
  @Prop({
    required: false,
    type: [
      {
        required: false,
        option: {
          type: mongoose.Schema.Types.ObjectId,
          autopopulate: true,
          required: true,
          ref: 'option',
          unique: false,
        },
        value: {
          type: mongoose.Schema.Types.String,
          required: true,
        },
      },
    ],
  })
  options: Array<Option>;
  @Prop({
    required: false,
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        autopopulate: true,
        ref: 'variation',
      },
    ],
    ref: 'variation',
    autopopulate: true,
    unique: true,
  })
  variations: Variation[];
  @Prop({ required: false, type: mongoose.Schema.Types.Mixed })
  video: Record<string, unknown>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
