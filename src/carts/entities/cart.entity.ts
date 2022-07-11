import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CartDocument = Document & Cart;

export class Cart {
  @Prop({ required: true, ref: 'user', type: mongoose.Schema.Types.ObjectId })
  owner: string;
  @Prop({
    required: false,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'product',
    autopopulate: true,
  })
  products: string[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
