import { ApiProperty } from '@nestjs/swagger';

export class SearchProductDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly price: number;
  @ApiProperty()
  readonly online: boolean;
  @ApiProperty()
  readonly shopkeeper: string;
  @ApiProperty()
  readonly store: string;
}
