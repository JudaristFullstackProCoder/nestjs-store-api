import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateChildcategoryDto } from './create-childcategory.dto';

export class UpdateChildcategoryDto extends PartialType(
  CreateChildcategoryDto,
) {
  @ApiProperty()
  /**
   * the name of the child category
   */
  readonly name: string;
  @ApiProperty()
  /**
   * The id of the parent category
   */
  readonly parent: string;
}
