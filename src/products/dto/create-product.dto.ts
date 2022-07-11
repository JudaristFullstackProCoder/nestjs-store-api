import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly price: number = 0;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly longDescription: string;
  @ApiProperty()
  readonly online: boolean = false;
  @ApiProperty()
  readonly shopkeeper: string;
  // @ApiProperty()
  readonly image: Record<string, unknown> = {};
  // @ApiProperty()
  readonly images: Array<Record<string, unknown>>;
  @ApiProperty()
  readonly store: string;
  // @ApiProperty()
  readonly variations: Record<string, unknown>[];
}
