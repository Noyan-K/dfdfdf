import { Test, TestingModule } from '@nestjs/testing';
import { CartSizeService } from './cart-size.service';

describe('CartSizeService', () => {
  let service: CartSizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartSizeService],
    }).compile();

    service = module.get<CartSizeService>(CartSizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
