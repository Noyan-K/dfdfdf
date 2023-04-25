import { ObjectType, Field } from '@nestjs/graphql';
import { FindCart } from './find-one-wishlist.model';

@ObjectType()
export class FindAllWishlists {
  @Field(() => FindCart)
    product_wishlist: FindCart;

  @Field(() => FindCart)
    supplier_wishlist: FindCart;
}
