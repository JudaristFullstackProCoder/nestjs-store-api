import { Test, TestingModule } from '@nestjs/testing';
import { ChildcategoriesService } from './childcategories.service';

describe('ChildcategoriesService', () => {
  let service: ChildcategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChildcategoriesService],
    }).compile();

    service = module.get<ChildcategoriesService>(ChildcategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
