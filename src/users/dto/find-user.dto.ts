import { ApiProperty } from '@nestjs/swagger';

export class FindUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  email: string;
}
