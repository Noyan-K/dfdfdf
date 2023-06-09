import { Test, TestingModule } from '@nestjs/testing';

import { OrderSizeService } from './order-size.service';

describe('OrderSizeService', () => {
    let service: OrderSizeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OrderSizeService],
        }).compile();

        service = module.get<OrderSizeService>(OrderSizeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
