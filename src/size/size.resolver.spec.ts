import { Test, TestingModule } from '@nestjs/testing';
import { SizeResolver } from './size.resolver';
import { SizeService } from './size.service';

describe('SizeResolver', () => {
  let resolver: SizeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SizeResolver, SizeService],
    }).compile();

    resolver = module.get<SizeResolver>(SizeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
