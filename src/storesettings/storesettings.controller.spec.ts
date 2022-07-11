import { Test, TestingModule } from '@nestjs/testing';
import { StoresettingsController } from './storesettings.controller';
import { StoresettingsService } from './storesettings.service';

describe('StoresettingsController', () => {
  let controller: StoresettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoresettingsController],
      providers: [StoresettingsService],
    }).compile();

    controller = module.get<StoresettingsController>(StoresettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
