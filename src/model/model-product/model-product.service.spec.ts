import { Test, TestingModule } from '@nestjs/testing';
import { ModelProductService } from './model-product.service';

describe('ModelProductService', () => {
  let service: ModelProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelProductService],
    }).compile();

    service = module.get<ModelProductService>(ModelProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
