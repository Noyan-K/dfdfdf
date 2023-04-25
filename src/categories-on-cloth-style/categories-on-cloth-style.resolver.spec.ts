import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesOnClothStyleResolver } from './categories-on-cloth-style.resolver';
import { CategoriesOnClothStyleService } from './categories-on-cloth-style.service';

describe('CategoriesOnClothStyleResolver', () => {
  let resolver: CategoriesOnClothStyleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesOnClothStyleResolver, CategoriesOnClothStyleService],
    }).compile();

    resolver = module.get<CategoriesOnClothStyleResolver>(CategoriesOnClothStyleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
