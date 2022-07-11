import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOptionDto } from './create-option.dto';

export class UpdateOptionDto extends PartialType(CreateOptionDto) {
  @ApiProperty()
  readonly name: string;
}
