import { Test, TestingModule } from '@nestjs/testing';
import { ChildcategoriesController } from './childcategories.controller';
import { ChildcategoriesService } from './childcategories.service';

describe('ChildcategoriesController', () => {
  let controller: ChildcategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChildcategoriesController],
      providers: [ChildcategoriesService],
    }).compile();

    controller = module.get<ChildcategoriesController>(
      ChildcategoriesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
