import { Test, TestingModule } from '@nestjs/testing';
import { CartSizeResolver } from './cart-size.resolver';
import { CartSizeService } from './cart-size.service';

describe('CartSizeResolver', () => {
  let resolver: CartSizeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartSizeResolver, CartSizeService],
    }).compile();

    resolver = module.get<CartSizeResolver>(CartSizeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
