import { Test, TestingModule } from '@nestjs/testing';
import { ClothStyleResolver } from './cloth-style.resolver';
import { ClothStyleService } from './cloth-style.service';

describe('ClothStyleResolver', () => {
  let resolver: ClothStyleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClothStyleResolver, ClothStyleService],
    }).compile();

    resolver = module.get<ClothStyleResolver>(ClothStyleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
