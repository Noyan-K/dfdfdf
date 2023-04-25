import { Test, TestingModule } from '@nestjs/testing';
import { NodeProcessingResolver } from './node-processing.resolver';
import { NodeProcessingService } from './node-processing.service';

describe('NodeProcessingResolver', () => {
  let resolver: NodeProcessingResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeProcessingResolver, NodeProcessingService],
    }).compile();

    resolver = module.get<NodeProcessingResolver>(NodeProcessingResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
