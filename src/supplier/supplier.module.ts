import { Module } from '@nestjs/common';

import { SupplierService } from './supplier.service';
import { SupplierResolver } from './supplier.resolver';

import PrismaModule from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SupplierResolver, SupplierService],
  exports: [SupplierService],
})
export class SupplierModule {}
