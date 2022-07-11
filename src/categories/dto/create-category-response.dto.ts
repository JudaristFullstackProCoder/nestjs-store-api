import { ApiProperty } from '@nestjs/swagger';

export class CreatedCategoryResponse {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly id: string;
}
