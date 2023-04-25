import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateSizeInput } from './dto/create-size.input';
import { UpdateSizeInput } from './dto/update-size.input';
import { Size } from './models/size.model';

@Injectable()
export class SizeService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createSizeInput: CreateSizeInput): Promise<Size> {
    const requisiteJson: Prisma.JsonObject = {
      name: createSizeInput.name,
      russian_size: createSizeInput.russian_size,
      chest_girth: createSizeInput.chest_girth,
      waits_girth: createSizeInput.waits_girth,
      hips_girth: createSizeInput.hips_girth,
    };

    return this.prismaService.size.create({ data: { ...createSizeInput, json: requisiteJson } });
  }

  findAll(
    take?: number,
    skip?: number,
  ): Promise<Size[]> {
    return this.prismaService.size.findMany({ take, skip });
  }

  findOne(id: number): Promise<Size | null> {
    return this.prismaService.size.findFirst({ where: { id } });
  }

  async update(id: number, updateSizeInput: UpdateSizeInput): Promise<Size | null> {
    await this.prismaService.size.updateMany({ where: { id }, data: updateSizeInput });
    return this.findOne(id);
  }

  remove(id: number): Promise<Size> {
    return this.prismaService.size.delete({ where: { id } });
  }
}
