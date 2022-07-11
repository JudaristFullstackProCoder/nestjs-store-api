import { Module } from '@nestjs/common';
import { VariationsService } from './variations.service';
import { VariationsController } from './variations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VariationSChema } from './entities/variation.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'variation', schema: VariationSChema }]),
  ],
  controllers: [VariationsController],
  providers: [VariationsService],
})
export class VariationsModule {}
