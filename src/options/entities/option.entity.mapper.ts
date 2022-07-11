import { ApiProperty } from '@nestjs/swagger';
import { OptionDocument } from './option.entity';

export type OptionEntityMap = {
  id: string;
  name: string;
};

export class OptionEntityMapClass {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  id: string;
}

export const mapToOptionEntity = function mapToOptionEntity(
  e: OptionDocument,
): OptionEntityMap {
  return {
    id: e['_id'],
    name: e.name,
  };
};
