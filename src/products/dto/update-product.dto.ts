import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly price: number = 0;
  @ApiProperty()
  readonly description: string = '';
  @ApiProperty()
  readonly longDescription: string = '';
  @ApiProperty()
  readonly online: boolean;
}
