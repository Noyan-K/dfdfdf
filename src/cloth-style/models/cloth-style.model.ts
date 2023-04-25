import { ObjectType, Field } from '@nestjs/graphql';
import { Cart } from 'src/cart/models/cart.model';
import { CategoriesOnClothStyle } from 'src/categories-on-cloth-style/models/categories-on-cloth-style.model';
import { ClothStyleModel } from './cloth-style';

@ObjectType()
export class ClothStyle extends ClothStyleModel {
  @Field(() => [CategoriesOnClothStyle])
    CategoriesOnClothStyle?: CategoriesOnClothStyle[];

  @Field(() => [Cart])
    Cart?: Cart[];
}
