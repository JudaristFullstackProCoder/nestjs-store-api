import { Module } from '@nestjs/common';
import { StoresettingsService } from './storesettings.service';
import { StoresettingsController } from './storesettings.controller';

@Module({
  controllers: [StoresettingsController],
  providers: [StoresettingsService],
})
export class StoresettingsModule {}
