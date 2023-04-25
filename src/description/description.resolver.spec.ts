import { Test, TestingModule } from '@nestjs/testing';
import { DescriptionResolver } from './description.resolver';
import { DescriptionService } from './description.service';

describe('DescriptionResolver', () => {
  let resolver: DescriptionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DescriptionResolver, DescriptionService],
    }).compile();

    resolver = module.get<DescriptionResolver>(DescriptionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
