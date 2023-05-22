import { ObjectType, Field } from '@nestjs/graphql';
import { Category } from 'src/category/models/category.model';
import { CartProduct } from '../cart-product/models/cart-product.model';
import { CartSize } from '../cart-size/models/cart-size.model';

@ObjectType()
export class Pdf {
  @Field(() => [CartProduct], { nullable: true })
    CartProducts?: CartProduct[] | null;

  @Field(() => Category, { nullable: true })
    Category?: Category;

  @Field(() => [CartSize], { nullable: true })
    CartSize?: CartSize[];
}
