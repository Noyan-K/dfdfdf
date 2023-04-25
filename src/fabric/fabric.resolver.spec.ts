import { Test, TestingModule } from '@nestjs/testing';
import { FabricResolver } from './fabric.resolver';
import { FabricService } from './fabric.service';

describe('FabricResolver', () => {
  let resolver: FabricResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FabricResolver, FabricService],
    }).compile();

    resolver = module.get<FabricResolver>(FabricResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
