import { Module } from '@nestjs/common';
import { SupplierProductPriceService } from './supplier-product-price.service';
import { SupplierProductPriceResolver } from './supplier-product-price.resolver';
import PrismaModule from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SupplierProductPriceResolver, SupplierProductPriceService],
})
export class SupplierProductPriceModule {}
