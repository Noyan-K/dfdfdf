import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartSizeService } from './cart-size.service';
import { CartSize } from './models/cart-size.model';
import { CreateCartSizeInput } from './dto/create-cart-size.input';
import { UpdateCartSizeInput } from './dto/update-cart-size.input';

@Resolver(() => CartSize)
export class CartSizeResolver {
  constructor(private readonly cartSizeService: CartSizeService) {}

  @Mutation(() => CartSize, { name: 'createCartSize' })
  create(@Args('createCartSizeInput') createCartSizeInput: CreateCartSizeInput) {
    return this.cartSizeService.create(createCartSizeInput);
  }

  // @Mutation(() => [CartSize], { name: 'createManyCartSize' })
  // createMany(@Args('createCartSizeInput') createCartSizeArrayInput: CreateCartSizeInput[]) {
  //   return this.cartSizeService.createMany(createCartSizeArrayInput);
  // }

  @Query(() => [CartSize], { name: 'cartSize' })
  findAll() {
    return this.cartSizeService.findAll();
  }

  @Query(() => CartSize, { name: 'cartSize' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cartSizeService.findOne(id);
  }

  @Mutation(() => CartSize)
  updateCartSize(@Args('updateCartSizeInput') updateCartSizeInput: UpdateCartSizeInput) {
    return this.cartSizeService.update(updateCartSizeInput.id, updateCartSizeInput);
  }

  @Mutation(() => CartSize)
  removeCartSize(@Args('id', { type: () => Int }) id: number) {
    return this.cartSizeService.remove(id);
  }
}
