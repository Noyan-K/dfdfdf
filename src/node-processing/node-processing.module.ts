import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import { NodeProcessingService } from './node-processing.service';
import { NodeProcessingResolver } from './node-processing.resolver';

@Module({
  providers: [NodeProcessingResolver, NodeProcessingService],
  imports: [PrismaModule],
})
export class NodeProcessingModule {}
