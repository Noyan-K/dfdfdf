import { ObjectType, Field } from '@nestjs/graphql';
import { Cart } from 'src/cart/models/cart.model';
import { CategoryModel } from './category';
import { ProductModel } from '../../product/models/product';

@ObjectType()
export class Category extends CategoryModel {
  @Field(() => [Category], { nullable: true })
    Children?: Category[] | null;

  @Field(() => Category, { nullable: true })
    Parent?: Category | null;

  @Field(() => [ProductModel], { nullable: true })
    Product?: ProductModel[] | null;

  @Field(() => [Cart], { nullable: true })
    Cart?: Cart[] | null;
}
