import { ApiProperty } from '@nestjs/swagger';

export class UpdateStoreDto {
  @ApiProperty()
  readonly name: string;
}
