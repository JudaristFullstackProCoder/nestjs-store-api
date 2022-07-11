import { ApiProperty } from '@nestjs/swagger';
import { Option } from 'src/options/entities/option.entity';

export class CreateChildcategoryDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  parent: string;
  readonly options: Array<Option>;
}
