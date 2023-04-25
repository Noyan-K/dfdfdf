import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { CartController } from './cart.controller';
import { DocumentModule } from '../document/document.module';

@Module({
  imports: [PrismaModule, DocumentModule],
  providers: [CartResolver, CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
