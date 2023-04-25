import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateModelInput } from './dto/create-model.input';
import { UpdateModelInput } from './dto/update-model.input';
import { Model } from './models/model.models';
import { Vendor } from '../vendor/models/vendor.models';

@Injectable()
export class ModelService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createModelInput: CreateModelInput): Promise<Model> {
    return this.prismaService.model.create({ data: createModelInput });
  }

  findAll(take?: number, skip?: number, sortOrder: Prisma.SortOrder = 'asc'): Promise<Model[]> {
    return this.prismaService.model.findMany({
      orderBy: { name: sortOrder },
      take,
      skip,
    });
  }

  findOne(id: number): Promise<Model | null> {
    return this.prismaService.model.findUnique({ where: { id } });
  }

  async update(updateModelInput: UpdateModelInput): Promise<Model | null> {
    await this.prismaService.model.update({
      where: { id: updateModelInput.id },
      data: updateModelInput,
    });

    return this.prismaService.model.findFirst({
      where: { id: updateModelInput.id },
    });
  }

  remove(id: number): Promise<Model> {
    return this.prismaService.model.delete({ where: { id } });
  }
}
