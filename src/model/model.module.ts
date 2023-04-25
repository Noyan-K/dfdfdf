import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import { ModelService } from './model.service';
import { ModelResolver } from './model.resolver';

@Module({
  imports: [PrismaModule],
  providers: [ModelResolver, ModelService],
})
export class ModelModule {}
