import { Module } from '@nestjs/common';
import { VariationsService } from './variations.service';
import { VariationsController } from './variations.controller';

@Module({
  controllers: [VariationsController],
  providers: [VariationsService],
})
export class VariationsModule {}
