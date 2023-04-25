import { Module } from '@nestjs/common';
import { ModelProductService } from './model-product.service';
import { ModelProductResolver } from './model-product.resolver';
import PrismaModule from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ModelProductResolver, ModelProductService],
})
export class ModelProductModule {}
