import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDescriptionInput } from './dto/create-description.input';
import { UpdateDescriptionInput } from './dto/update-description.input';
import { Description } from './models/description.model';

@Injectable()
export class DescriptionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createDescriptionInput: CreateDescriptionInput,
  ): Promise<Description> {
    return this.prisma.description.create({
      data: createDescriptionInput,
    });
  }

  async findAll(take?: number, skip?: number): Promise<Description[]> {
    return this.prisma.description.findMany({ take, skip });
  }

  async findOne(id: number): Promise<Description> {
    const receivedDescription: Description | null = await this.prisma.description.findUnique({
      where: { id },
    });

    if (!receivedDescription) {
      throw new NotFoundException();
    }

    return receivedDescription;
  }

  async update(
    id: number,
    updateDescriptionInput: UpdateDescriptionInput,
  ): Promise<Description | null> {
    await this.prisma.description.update({
      data: updateDescriptionInput,
      where: { id },
    });

    return this.prisma.description.findFirst({
      where: { id: updateDescriptionInput.id },
    });
  }

  async remove(id: number): Promise<Description> {
    return this.prisma.description.delete({
      where: { id },
    });
  }
}
