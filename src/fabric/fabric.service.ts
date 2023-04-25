import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFabricInput } from './dto/create-fabric.input';
import { UpdateFabricInput } from './dto/update-fabric.input';
import { FabricModel } from './models/fabric';

@Injectable()
export class FabricService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createFabricInput: CreateFabricInput): Promise<FabricModel> {
    return this.prismaService.fabric.upsert({
      where: { name: createFabricInput.name },
      create: createFabricInput,
      update: { deleted_at: null },
    });
  }

  findAll(
    skip?: number,
    take?: number,
  ): Promise<FabricModel[]> {
    return this.prismaService.fabric.findMany({ skip, take });
  }

  findOne(id: number): Promise<FabricModel | null> {
    return this.prismaService.fabric.findFirst({ where: { id } });
  }

  async update(id: number, updateFabricInput: UpdateFabricInput): Promise<FabricModel | null> {
    await this.prismaService.fabric.updateMany({ where: { id }, data: updateFabricInput });

    return this.prismaService.fabric.findFirst({ where: { id } });
  }

  remove(id: number): Promise<FabricModel> {
    return this.prismaService.fabric.delete({ where: { id } });
  }
}
