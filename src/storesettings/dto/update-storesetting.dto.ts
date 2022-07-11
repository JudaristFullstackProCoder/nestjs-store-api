import { PartialType } from '@nestjs/swagger';
import { CreateStoresettingDto } from './create-storesetting.dto';

export class UpdateStoresettingDto extends PartialType(CreateStoresettingDto) {}
