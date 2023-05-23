import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
// import { OrderController } from './order.controller';
import { DocumentModule } from '../document/document.module';

@Module({
  imports: [PrismaModule, DocumentModule],
  providers: [OrderResolver, OrderService],
  controllers: [
    // OrderController,
  ],
  exports: [OrderService],
})
export class OrderModule {}
