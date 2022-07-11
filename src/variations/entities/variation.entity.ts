import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Option } from 'src/options/entities/option.entity';

export type VariationDocument = Variation & Document<string>;

export class Variation {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  readonly name: string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  readonly product: string;
  @Prop({
    required: false,
    type: [
      {
        option: {
          type: mongoose.Schema.Types.ObjectId,
          autopopulate: true,
          required: true,
          ref: 'option',
        },
        value: {
          type: mongoose.Schema.Types.String,
          required: true,
        },
      },
    ],
  })
  options: Array<Option>;
  @Prop({ required: true, type: mongoose.Schema.Types.String })
  price: number;
  @Prop({ required: true, type: mongoose.Schema.Types.Subdocument })
  readonly image: Record<string, unknown>;
}

export const VariationSChema = SchemaFactory.createForClass(Variation);
