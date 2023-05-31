import { Injectable } from '@nestjs/common';

import { CreateOrderSizeInput } from './dto/create-order-size.input';
import { UpdateOrderSizeInput } from './dto/update-order-size.input';
import { OrderSize } from './models/order-size.model';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrderSizeService {
  constructor(private readonly prisma: PrismaService) {}

  create(createOrderSizeInput: CreateOrderSizeInput): Promise<OrderSize> {
    return this.prisma.orderSize.upsert({
      where: { order_id_size_id: { ...createOrderSizeInput } },
      update: { deleted_at: null },
      create: { ...createOrderSizeInput },
    });
  }

  // async createMany(createCartSizeArrayInput: CreateCartSizeInput[]): Promise<OrderSize[]> {
  //   const promises: Promise<CartSize> = [];
  //   createCartSizeArrayInput.map((el) => promises.push(this.create(el)));
  //   const cartSizes = await Promise.all(promises);
  //   return cartSizes;
  // }

  findAll() {
    return `This action returns all orderSize`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderSize`;
  }

  update(id: number, updateOrderSizeInput: UpdateOrderSizeInput) {
    return `This action updates a #${id} orderSize`;
  }

  remove(order_id: number, size_id: number): Promise<OrderSize> {
    return this.prisma.orderSize.delete({
      where: { order_id_size_id: { order_id, size_id } },
    });
  }
}
