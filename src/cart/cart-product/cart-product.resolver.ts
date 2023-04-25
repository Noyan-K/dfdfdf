import { UseGuards } from '@nestjs/common/decorators';
import {
  Resolver, Args, Mutation, Query, Int,
} from '@nestjs/graphql';
// import { GqlJwtAuthGuard } from 'src/auth/guards/gql-jwt-auth.guard';
// import { ValidatedUser } from 'src/auth/interfaces/validatedUser.interface';
// import { CurrentUser } from 'src/user/decorators/user.decorator.graphql';
// import { NotFoundException } from '@nestjs/common';
// import { CreateCartProductInput } from './dto/create-cart-product.dto';
// import { DeleteCartProductInput } from './dto/delete-cart-product.input';
// import { UpdateCartProductInput } from './dto/update-cart-product.dto';
// import { AddProductToCartInput } from './dto/add-product-to-cart.dto';
import { CartProduct } from './models/cart-product.model';
import { CartProductService } from './cart-product.service';
// import { WatchListTypeUnion, WatchListTypeEnum } from '../../types/cart.type';
// import { CartProductModel } from './models/cart-product';
// import { AddToCart } from './dto/add-to-cart.dto';

@Resolver(() => CartProduct)
export class CartProductResolver {
  constructor(private readonly cartProductService: CartProductService) {}

  // @UseGuards(GqlJwtAuthGuard)
  // @Mutation(() => AddToCart, { name: 'addProductToCart', nullable: true })
  // async addProductToCart(
  //   @CurrentUser() user: ValidatedUser,
  //     @Args('AddProductToCartInput')
  //     addProductToCartInput: AddProductToCartInput,
  // ): Promise<AddToCart> {
  //   const receivedCartProducts = await this.cartProductService.addProductToCart(
  //     user.id,
  //     addProductToCartInput,
  //   );

  //   return {
  //     cart_id: receivedCartProducts[0].cart_id,
  //     total: receivedCartProducts.length,
  //   };
  // }

  // @UseGuards(GqlJwtAuthGuard)
  // @Mutation(() => CartProduct, { name: 'createCartProduct' })
  // create(
  //   @CurrentUser() user: ValidatedUser,
  //     @Args('createCartProductInput')
  //     createCartProductInput: CreateCartProductInput,
  // ): Promise<CartProductModel> {
  //   return this.cartProductService.create(user.id, createCartProductInput);
  // }

  // @UseGuards(GqlJwtAuthGuard)
  // @Query(() => [CartProduct], { name: 'cartProducts', nullable: true })
  // findAll(
  //   @Args('cart_id', { type: () => Int }) cart_id: number,
  // ): Promise<CartProductModel[]> {
  //   try {
  //     return this.cartProductService.findAll(cart_id);
  //   } catch (e) {
  //     throw new NotFoundException('Products in Cart not found!');
  //   }
  // }

  // @UseGuards(GqlJwtAuthGuard)
  // @Query(() => CartProduct, { name: 'cartProduct', nullable: true })
  // findOne(
  //   @Args('cart_id', { type: () => Int }) cart_id: number,
  //     @Args('product_id', { type: () => Int }) product_id: number,
  // ): Promise<CartProductModel | null> {
  //   try {
  //     return this.cartProductService.findOne(cart_id, product_id);
  //   } catch (e) {
  //     throw new NotFoundException('Product in Cart not found!');
  //   }
  // }

  // @UseGuards(GqlJwtAuthGuard)
  // @Mutation(() => CartProduct, { name: 'updateCartProduct' })
  // update(
  //   @CurrentUser() user: ValidatedUser,
  //     @Args('updateCartProductInput')
  //     updateCartProductInput: UpdateCartProductInput,
  // ): Promise<CartProductModel | null> {
  //   return this.cartProductService.update(user.id, updateCartProductInput);
  // }

  // @UseGuards(GqlJwtAuthGuard)
  // @Mutation(() => CartProduct, { name: 'deleteCartProduct' })
  // remove(
  //   @CurrentUser() user: ValidatedUser,
  //     @Args('deleteCartProductInput')
  //     deleteCartProductInput: DeleteCartProductInput,
  // ): Promise<CartProductModel> {
  //   return this.cartProductService.remove(user.id, deleteCartProductInput);
  // }

  // @UseGuards(GqlJwtAuthGuard)
  // @Mutation(() => CartProduct, { name: 'addToWatchList' })
  // addToWatchList(
  //   @CurrentUser() user: ValidatedUser,
  //     @Args('type', { type: () => WatchListTypeEnum }) type: WatchListTypeUnion,
  //     @Args('product_id', { type: () => Int, nullable: true })
  //     product_id?: number,
  //     @Args('supplier_id', { type: () => Int, nullable: true })
  //     supplier_id?: number,
  // ): Promise<CartProductModel> {
  //   return this.cartProductService.addToWatchList(
  //     user.id,
  //     type,
  //     product_id,
  //     supplier_id,
  //   );
  // }

  // @UseGuards(GqlJwtAuthGuard)
  // @Mutation(() => CartProduct, { name: 'removeFromWatchList' })
  // removeFromWatchList(
  //   @CurrentUser() user: ValidatedUser,
  //     @Args('type', { type: () => WatchListTypeEnum }) type: WatchListTypeUnion,
  //     @Args('product_id', { type: () => Int, nullable: true })
  //     product_id?: number,
  //     @Args('supplier_id', { type: () => Int, nullable: true })
  //     supplier_id?: number,
  // ): Promise<CartProductModel> {
  //   return this.cartProductService.removeFromWatchList(
  //     user.id,
  //     type,
  //     product_id,
  //     supplier_id,
  //   );
  // }
}
