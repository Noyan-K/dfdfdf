import { Module } from '@nestjs/common';
import { CartSizeService } from './cart-size.service';
import { CartSizeResolver } from './cart-size.resolver';
import PrismaModule from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CartSizeResolver, CartSizeService],
})
export class CartSizeModule {}
