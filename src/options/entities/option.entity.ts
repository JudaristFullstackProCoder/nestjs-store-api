import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type OptionDocument = Option & Document<string>;

@Schema()
export class Option {
  @Prop({ required: true, type: mongoose.Schema.Types.String, unique: true })
  readonly name: string;
}

export const OptioneSchema = SchemaFactory.createForClass(Option);
