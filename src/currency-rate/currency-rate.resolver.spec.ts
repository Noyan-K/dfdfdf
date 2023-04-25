import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyRateResolver } from './currency-rate.resolver';
import { CurrencyRateService } from './currency-rate.service';

describe('CurrencyRateResolver', () => {
  let resolver: CurrencyRateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyRateResolver, CurrencyRateService],
    }).compile();

    resolver = module.get<CurrencyRateResolver>(CurrencyRateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
