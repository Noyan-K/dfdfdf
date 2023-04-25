import { Module } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { CartProductResolver } from './cart-product.resolver';
import PrismaModule from '../../prisma/prisma.module';
import { CartModule } from '../cart.module';

@Module({
  imports: [PrismaModule, CartModule],
  providers: [CartProductResolver, CartProductService],
})
export class CartProductModule {}
