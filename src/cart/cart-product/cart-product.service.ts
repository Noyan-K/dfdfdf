import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { SupplierProductPrice } from '@prisma/client';
// import { CreateCartProductInput } from './dto/create-cart-product.dto';
// import { DeleteCartProductInput } from './dto/delete-cart-product.input';
// import { UpdateCartProductInput } from './dto/update-cart-product.dto';
// import { AddProductToCartInput } from './dto/add-product-to-cart.dto';
// import { CartProduct } from './models/cart-product.model';
// import { CartService } from '../cart.service';
// import { CartTypeEnum, WatchListTypeUnion } from '../../types/cart.type';

@Injectable()
export class CartProductService {
  // constructor(
  //   private readonly prismaService: PrismaService,
  //   private readonly cartService: CartService,
  // ) {}

  // async create(
  //   user_id: number,
  //   createCartProductInput: CreateCartProductInput,
  // ): Promise<CartProduct> {
  //   await this.cartService.checkCartPermission(
  //     user_id,
  //     createCartProductInput.cart_id,
  //   );

  //   if (!createCartProductInput.supplier_id) {
  //     const receivedSupplierProductPrice: SupplierProductPrice[] = await this.prismaService.supplierProductPrice.findMany({
  //       where: { product_id: createCartProductInput.product_id },
  //     });

  //     const lowestPriceOffer: SupplierProductPrice = receivedSupplierProductPrice.reduce((prev, curr) => {
  //       if (!prev.price || !curr.price) {
  //         return prev.price === null ? prev : curr;
  //       }

  //       return prev?.price < curr?.price ? prev : curr;
  //     });

  //     createCartProductInput.supplier_id = lowestPriceOffer.supplier_id;
  //   }

  //   return this.prismaService.cartProduct.upsert({
  //     where: {
  //       cart_id_product_id: {
  //         cart_id: createCartProductInput.cart_id,
  //         product_id: createCartProductInput.product_id,
  //       },
  //     },
  //     update: {
  //       supplier_id: createCartProductInput.supplier_id,
  //       quantity: createCartProductInput.quantity,
  //       deleted_at: null,
  //     },
  //     create: {
  //       ...createCartProductInput,
  //       supplier_id: createCartProductInput.supplier_id,
  //     },
  //   });
  // }

  // findAll(cart_id: number): Promise<CartProduct[]> {
  //   return this.prismaService.cartProduct.findMany({
  //     where: {
  //       cart_id,
  //     },
  //   });
  // }

  // async findOne(
  //   cart_id: number,
  //   product_id: number,
  // ): Promise<CartProduct | null> {
  //   const receivedCart = await this.prismaService.cartProduct.findFirst({
  //     where: {
  //       cart_id,
  //       product_id,
  //     },
  //   });

  //   if (!receivedCart) {
  //     throw new NotFoundException();
  //   }

  //   return receivedCart;
  // }

  // async update(
  //   user_id: number,
  //   updateCartProductInput: UpdateCartProductInput,
  // ): Promise<CartProduct | null> {
  //   const receivedCart = await this.cartService.checkCartPermission(
  //     user_id,
  //     updateCartProductInput.cart_id,
  //   );

  //   await this.prismaService.cartProduct.updateMany({
  //     where: {
  //       cart_id: receivedCart!.id,
  //       product_id: updateCartProductInput.product_id,
  //     },
  //     data: {
  //       supplier_id: updateCartProductInput.supplier_id,
  //       quantity: updateCartProductInput.quantity,
  //     },
  //   });

  //   return this.prismaService.cartProduct.findFirst({
  //     where: {
  //       cart_id: receivedCart!.id,
  //       product_id: updateCartProductInput.product_id,
  //     },
  //   });
  // }

  // async remove(
  //   user_id: number,
  //   deleteCartProductInput: DeleteCartProductInput,
  // ): Promise<CartProduct> {
  //   await this.cartService.checkCartPermission(
  //     user_id,
  //     deleteCartProductInput.cart_id,
  //   );

  //   return this.prismaService.cartProduct.delete({
  //     where: {
  //       cart_id_product_id: {
  //         cart_id: deleteCartProductInput.cart_id,
  //         product_id: deleteCartProductInput.product_id,
  //       },
  //     },
  //     include: {
  //       Product: {
  //         include: {
  //           Vendor: true,
  //           SupplierProductPrice: true,
  //         },
  //       },
  //     },
  //   });
  // }

  // async addProductToCart(
  //   user_id: number,
  //   addProductToCartInput: AddProductToCartInput,
  // ): Promise<CartProduct[]> {
  //   if (!addProductToCartInput.cart_id) {
  //     addProductToCartInput.cart_id = (
  //       await this.cartService.create(user_id, addProductToCartInput.name)
  //     ).id;
  //   } else {
  //     await this.cartService.checkCartPermission(
  //       user_id,
  //       addProductToCartInput.cart_id,
  //     );
  //   }

  //   delete addProductToCartInput.name;
  //   const createCartProductInput: CreateCartProductInput = <
  //     CreateCartProductInput
  //   >addProductToCartInput;

  //   await this.create(user_id, createCartProductInput);

  //   return this.prismaService.cartProduct.findMany({
  //     where: { cart_id: addProductToCartInput.cart_id },
  //   });
  // }

  // async addToWatchList(
  //   user_id: number,
  //   type: WatchListTypeUnion,
  //   product_id?: number,
  //   supplier_id?: number,
  // ): Promise<CartProduct> {
  //   let watchList = await this.cartService.checkCartPermission(
  //     user_id,
  //     undefined,
  //     type,
  //     false,
  //   );

  //   if (!watchList) {
  //     watchList = await this.cartService.create(user_id, type, type);
  //   }

  //   let typeObj;
  //   if (type === CartTypeEnum.PRODUCT_WATCHLIST && product_id) typeObj = { product_id };
  //   else if (type === CartTypeEnum.SUPPLIER_WATCHLIST && supplier_id) typeObj = { supplier_id };
  //   else throw new BadRequestException('Bad value for this type of Cart!');

  //   const elem = await this.prismaService.cartProduct.findFirst({
  //     where: {
  //       cart_id: watchList.id,
  //       ...typeObj,
  //       deleted_at: 'all',
  //     },
  //   });

  //   return this.prismaService.cartProduct.upsert({
  //     where: {
  //       id: elem?.id ?? -1,
  //     },
  //     update: {
  //       ...typeObj,
  //       deleted_at: null,
  //     },
  //     create: {
  //       cart_id: watchList.id,
  //       ...typeObj,
  //     },
  //   });
  // }

  // async removeFromWatchList(
  //   user_id: number,
  //   type: WatchListTypeUnion,
  //   product_id?: number,
  //   supplier_id?: number,
  // ): Promise<CartProduct> {
  //   const watchList = await this.cartService.checkCartPermission(
  //     user_id,
  //     undefined,
  //     type,
  //     false,
  //   );

  //   if (!watchList) {
  //     throw new BadRequestException('You cant remove nothing!');
  //   }

  //   let typeObj;
  //   if (type === CartTypeEnum.PRODUCT_WATCHLIST && product_id) typeObj = { product_id };
  //   else if (type === CartTypeEnum.SUPPLIER_WATCHLIST && supplier_id) typeObj = { supplier_id };
  //   else throw new BadRequestException('Bad value for this type of Cart!');

  //   const elem = await this.prismaService.cartProduct.findFirst({
  //     where: {
  //       cart_id: watchList.id,
  //       ...typeObj,
  //     },
  //   });
  //   if (!elem) {
  //     throw new NotFoundException(
  //       'Product or Supplier not exist in watchlist or already deleted!',
  //     );
  //   }

  //   return this.prismaService.cartProduct.delete({
  //     where: {
  //       id: elem.id,
  //     },
  //   });
  // }
}
