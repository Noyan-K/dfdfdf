import { NotFoundException } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import {
  Resolver, Query, Args, Int, Mutation,
} from '@nestjs/graphql';
import { GqlJwtAuthGuard } from 'src/auth/guards/gql-jwt-auth.guard';
import { CartService } from './cart.service';
import { Cart } from './models/cart.model';
import { CreateCartInput } from './dto/create-cart.input';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => Cart, { name: 'createCart' })
  create(@Args('createCartInput') createCartInput: CreateCartInput): Promise<Cart> {
    return this.cartService.create(createCartInput);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [Cart], { name: 'carts' })
  findAll(
    @Args('contact_id', { type: () => Int }) contact_id: number,
      @Args('take', { type: () => Int, nullable: true }) take?: number,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ): Promise<Cart[]> {
    try {
      return this.cartService.findAll(contact_id, take, skip);
    } catch (e) {
      throw new NotFoundException('Carts not found!');
    }
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => Cart, { name: 'cart', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Cart | null> {
    try {
      return this.cartService.findOne(id);
    } catch (e) {
      throw new NotFoundException('Cart not found!');
    }
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Cart, { name: 'deleteCart' })
  remove(@Args('id', { type: () => Int }) id: number): Promise<Cart> {
    return this.cartService.remove(id);
  }
}
