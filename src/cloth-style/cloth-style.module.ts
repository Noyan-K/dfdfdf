import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import { ClothStyleService } from './cloth-style.service';
import { ClothStyleResolver } from './cloth-style.resolver';

@Module({
  providers: [ClothStyleResolver, ClothStyleService],
  imports: [PrismaModule],
})
export class ClothStyleModule {}
