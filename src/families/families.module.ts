import { Module } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { FamiliesController } from './families.controller';

@Module({
  controllers: [FamiliesController],
  providers: [FamiliesService],
})
export class FamiliesModule {}
