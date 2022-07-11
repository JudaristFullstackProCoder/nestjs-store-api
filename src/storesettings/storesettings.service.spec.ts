import { Test, TestingModule } from '@nestjs/testing';
import { StoresettingsService } from './storesettings.service';

describe('StoresettingsService', () => {
  let service: StoresettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoresettingsService],
    }).compile();

    service = module.get<StoresettingsService>(StoresettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
