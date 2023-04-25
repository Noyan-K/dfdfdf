import { ObjectType, Field } from '@nestjs/graphql';
import { Product } from 'src/product/models/product.models';
import { Supplier } from 'src/supplier/models/supplier.model';
import { CartProductModel } from './cart-product';
import { CartModel } from '../../models/cart';

@ObjectType()
export class CartProduct extends CartProductModel {
  @Field(() => Product, { nullable: true })
    Product?: Product | null;

  @Field(() => CartModel)
    Cart?: CartModel | null;

  @Field(() => Supplier, { nullable: true })
    Supplier?: Supplier | null;
}
