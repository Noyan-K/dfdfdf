import { Test, TestingModule } from '@nestjs/testing';
import { SupplierProductPriceResolver } from './supplier-product-price.resolver';
import { SupplierProductPriceService } from './supplier-product-price.service';

describe('SupplierProductPriceResolver', () => {
  let resolver: SupplierProductPriceResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierProductPriceResolver, SupplierProductPriceService],
    }).compile();

    resolver = module.get<SupplierProductPriceResolver>(
      SupplierProductPriceResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
