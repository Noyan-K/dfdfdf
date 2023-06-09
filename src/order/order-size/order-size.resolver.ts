import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { OrderSizeService } from './order-size.service';
import { OrderSize } from './models/order-size.model';
import { CreateOrderSizeInput } from './dto/create-order-size.input';
import { UpdateOrderSizeInput } from './dto/update-order-size.input';

@Resolver(() => OrderSize)
export class OrderSizeResolver {
    constructor(private readonly orderSizeService: OrderSizeService) {}

    @Mutation(() => OrderSize, { name: 'createOrderSize' })
    create(@Args('createOrderSizeInput') createOrderSizeInput: CreateOrderSizeInput) {
        return this.orderSizeService.create(createOrderSizeInput);
    }

    // @Mutation(() => [CartSize], { name: 'createManyCartSize' })
    // createMany(@Args('createCartSizeInput') createCartSizeArrayInput: CreateCartSizeInput[]) {
    //   return this.cartSizeService.createMany(createCartSizeArrayInput);
    // }

    @Query(() => [OrderSize], { name: 'orderSize' })
    findAll() {
        return this.orderSizeService.findAll();
    }

    @Query(() => OrderSize, { name: 'orderSize' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.orderSizeService.findOne(id);
    }

    @Mutation(() => OrderSize)
    updateOrderSize(@Args('updateOrderSizeInput') updateOrderSizeInput: UpdateOrderSizeInput) {
        return this.orderSizeService.update(updateOrderSizeInput.id, updateOrderSizeInput);
    }

    @Mutation(() => OrderSize)
    removeOrderSize(
        @Args('order_id', { type: () => Int }) order_id: number,
        @Args('size_id', { type: () => Int }) size_id: number,
    ) {
        return this.orderSizeService.remove(order_id, size_id);
    }
}
