import { Test, TestingModule } from '@nestjs/testing';
import { SupplierProductPriceService } from './supplier-product-price.service';

describe('SupplierProductPriceService', () => {
  let service: SupplierProductPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierProductPriceService],
    }).compile();

    service = module.get<SupplierProductPriceService>(
      SupplierProductPriceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
