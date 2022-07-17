import { Module } from '@nestjs/common';
import { PromocodesService } from './promocodes.service';
import { PromocodesController } from './promocodes.controller';

@Module({
  controllers: [PromocodesController],
  providers: [PromocodesService],
})
export class PromocodesModule {}
