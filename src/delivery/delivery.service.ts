import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeliveryInput } from './dto/create-delivery.input';
import { UpdateDeliveryInput } from './dto/update-delivery.input';
import { Delivery } from './models/delivery.models';

@Injectable()
export class DeliveryService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDeliveryInput: CreateDeliveryInput): Promise<Delivery> {
    return this.prismaService.delivery.upsert({
      where: { name: createDeliveryInput.name },
      update: createDeliveryInput,
      create: createDeliveryInput,
    });
  }

  findAll(skip?: number, take?: number): Promise<Delivery[]> {
    return this.prismaService.delivery.findMany({ skip, take });
  }

  findOne(id: number): Promise<Delivery | null> {
    return this.prismaService.delivery.findFirst({ where: { id } });
  }

  async update(id: number, updateDeliveryInput: UpdateDeliveryInput): Promise<Delivery | null> {
    await this.prismaService.delivery.updateMany({
      where: { id },
      data: updateDeliveryInput,
    });

    return this.prismaService.delivery.findFirst({ where: { id } });
  }

  remove(id: number): Promise<Delivery> {
    return this.prismaService.delivery.delete({ where: { id } });
  }
}
