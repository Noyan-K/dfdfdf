import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import { DeliveryService } from './delivery.service';
import { DeliveryResolver } from './delivery.resolver';

@Module({
  providers: [DeliveryResolver, DeliveryService],
  imports: [PrismaModule],
  exports: [DeliveryService],
})
export class DeliveryModule {}
