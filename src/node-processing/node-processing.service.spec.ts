import { Test, TestingModule } from '@nestjs/testing';
import { NodeProcessingService } from './node-processing.service';

describe('NodeProcessingService', () => {
  let service: NodeProcessingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NodeProcessingService],
    }).compile();

    service = module.get<NodeProcessingService>(NodeProcessingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
