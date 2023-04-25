import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNodeProcessingInput } from './dto/create-node-processing.input';
import { UpdateNodeProcessingInput } from './dto/update-node-processing.input';
import { NodeProcessing } from './models/node-processing.model';

@Injectable()
export class NodeProcessingService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createNodeProcessingInput: CreateNodeProcessingInput): Promise<NodeProcessing> {
    return this.prismaService.nodeProcessing.create({ data: createNodeProcessingInput });
  }

  findAll(
    skip?: number,
    take?: number,
  ): Promise<NodeProcessing[]> {
    return this.prismaService.nodeProcessing.findMany({ take, skip });
  }

  findOne(id: number): Promise<NodeProcessing | null> {
    return this.prismaService.nodeProcessing.findFirst({ where: { id } });
  }

  async update(id: number, updateNodeProcessingInput: UpdateNodeProcessingInput): Promise<NodeProcessing | null> {
    await this.prismaService.nodeProcessing.updateMany({ where: { id }, data: updateNodeProcessingInput });

    return this.prismaService.nodeProcessing.findFirst({ where: { id } });
  }

  remove(id: number): Promise<NodeProcessing> {
    return this.prismaService.nodeProcessing.delete({ where: { id } });
  }
}
