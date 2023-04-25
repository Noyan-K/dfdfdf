import { Test, TestingModule } from '@nestjs/testing';
import { ModelProductResolver } from './model-product.resolver';
import { ModelProductService } from './model-product.service';

describe('ModelProductResolver', () => {
  let resolver: ModelProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelProductResolver, ModelProductService],
    }).compile();

    resolver = module.get<ModelProductResolver>(ModelProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
