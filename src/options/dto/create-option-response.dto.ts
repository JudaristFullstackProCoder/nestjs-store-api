import { ApiProperty } from '@nestjs/swagger';

export class CreatedOptionResponse {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly name: string;
}
