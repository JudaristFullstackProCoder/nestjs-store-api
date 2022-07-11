import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Option } from 'src/options/entities/option.entity';

export type CategoryDocument = Category & Document<string>;

export type CategoryApiFilter = {
  readonly name: string;
};

@Schema()
export class Category {
  @Prop({ required: true, unique: true })
  readonly name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
