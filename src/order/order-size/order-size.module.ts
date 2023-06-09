import { Module } from '@nestjs/common';

import { OrderSizeService } from './order-size.service';
import { OrderSizeResolver } from './order-size.resolver';

import PrismaModule from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [OrderSizeResolver, OrderSizeService],
})
export class OrderSizeModule {}
