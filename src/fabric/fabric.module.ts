import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import { FabricService } from './fabric.service';
import { FabricResolver } from './fabric.resolver';

@Module({
  providers: [FabricResolver, FabricService],
  imports: [PrismaModule],
})
export class FabricModule {}
