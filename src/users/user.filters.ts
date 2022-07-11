import { ApiProperty } from '@nestjs/swagger';

export type UserFiltersType = {
  username?: string;
  password?: string;
  role?: string;
  email?: string;
};

export class UserFilters {
  @ApiProperty()
  username?: string;
  @ApiProperty()
  password?: string;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  role?: string;
}
