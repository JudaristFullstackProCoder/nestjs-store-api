import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  username: string;
  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  email: string;
  @ApiProperty({ enum: ['USER', 'ADMIN'] })
  readonly role: string;
}
