import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import PrismaModule from '../prisma/prisma.module';
import { DocumentModule } from '../document/document.module';

@Module({
  imports: [PrismaModule, DocumentModule],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
