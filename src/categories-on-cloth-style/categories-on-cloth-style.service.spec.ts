import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesOnClothStyleService } from './categories-on-cloth-style.service';

describe('CategoriesOnClothStyleService', () => {
  let service: CategoriesOnClothStyleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesOnClothStyleService],
    }).compile();

    service = module.get<CategoriesOnClothStyleService>(CategoriesOnClothStyleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
