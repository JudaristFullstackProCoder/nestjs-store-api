import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type CategoryDocument = Category & Document<string>;

export type CategoryApiFilter = {
  readonly name: string;
};

@Schema()
export class Category {
  @Prop({ required: true, unique: true, type: mongoose.Schema.Types.String })
  readonly name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
