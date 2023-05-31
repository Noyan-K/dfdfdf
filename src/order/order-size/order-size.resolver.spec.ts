import { Test, TestingModule } from '@nestjs/testing';

import { OrderSizeResolver } from './order-size.resolver';
import { OrderSizeService } from './order-size.service';

describe('OrderSizeResolver', () => {
  let resolver: OrderSizeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderSizeResolver, OrderSizeService],
    }).compile();

    resolver = module.get<OrderSizeResolver>(OrderSizeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
