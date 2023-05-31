import { NotFoundException } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';

import { GqlJwtAuthGuard } from 'src/auth/guards/gql-jwt-auth.guard';

import { OrderService } from './order.service';
import { Order } from './models/order.model';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

import { Document } from '../document/models/document.model';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order, { name: 'createOrder' })
  create(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ): Promise<Order> {
    return this.orderService.create(createOrderInput);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [Order], { name: 'orders' })
  findAll(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ): Promise<Order[]> {
    try {
      return this.orderService.findAll(take, skip);
    } catch (e) {
      throw new NotFoundException('Orders not found!');
    }
  }

  @Query(() => Order, { name: 'order', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Order | null> {
    try {
      return this.orderService.findOne(id);
    } catch (e) {
      throw new NotFoundException('Order not found!');
    }
  }

  @Mutation(() => Order, { nullable: true })
  updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ): Promise<Order | null> {
    return this.orderService.update(updateOrderInput.id, updateOrderInput);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Order, { name: 'deleteOrder' })
  remove(@Args('id', { type: () => Int }) id: number): Promise<Order> {
    return this.orderService.remove(id);
  }

  @Query(() => Document, { name: 'generatePdf', nullable: true })
  generatePdf(@Args('id', { type: () => Int }) id: number): Promise<Document> {
    return this.orderService.generatePdf(id);
  }
}
