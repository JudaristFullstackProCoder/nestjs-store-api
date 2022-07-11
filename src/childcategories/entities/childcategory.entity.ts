import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from 'src/categories/entities/category.entity';
import { Option } from 'src/options/entities/option.entity';

export type ChildCategoryDocument = ChildCategory & Document<string>;

export class ChildCategory {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  readonly name: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true,
    autopopulate: true,
  })
  readonly parent: Category;
  @Prop({
    required: false,
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        autopopulate: true,
        required: true,
        ref: 'option',
      },
    ],
  })
  readonly options: Option[];
}

export const ChildCategorySchema = SchemaFactory.createForClass(ChildCategory);
