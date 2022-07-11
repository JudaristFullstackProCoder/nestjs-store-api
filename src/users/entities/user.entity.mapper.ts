import { ApiProperty } from '@nestjs/swagger';
import { User, UserDocument } from './user.entity';
export type UserEntityMap = {
  username: string;
  role: string;
  id: string;
};
export class UserEntityMapClass {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly role: string;
  @ApiProperty()
  readonly id: string;
}
/**
 * Convert user object (comming from db) to api response object
 */
export const mapToUserEntity = function mapToUserEntity(
  e: UserDocument | User,
): UserEntityMap {
  return {
    username: e.username,
    role: e.role,
    id: e['_id'],
  };
};
