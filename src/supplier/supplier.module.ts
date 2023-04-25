import { Module } from '@nestjs/common';
import { DeliveryModule } from 'src/delivery/delivery.module';
import { SupplierService } from './supplier.service';
import { SupplierResolver } from './supplier.resolver';
import PrismaModule from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, DeliveryModule],
  providers: [SupplierResolver, SupplierService],
  exports: [SupplierService],
})
export class SupplierModule {}
