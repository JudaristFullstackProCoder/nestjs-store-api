import { Test, TestingModule } from '@nestjs/testing';
import { PromocodesController } from './promocodes.controller';
import { PromocodesService } from './promocodes.service';

describe('PromocodesController', () => {
  let controller: PromocodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromocodesController],
      providers: [PromocodesService],
    }).compile();

    controller = module.get<PromocodesController>(PromocodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
