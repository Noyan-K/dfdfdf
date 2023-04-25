import { Test, TestingModule } from '@nestjs/testing';
import { ClothStyleService } from './cloth-style.service';

describe('ClothStyleService', () => {
  let service: ClothStyleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClothStyleService],
    }).compile();

    service = module.get<ClothStyleService>(ClothStyleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
