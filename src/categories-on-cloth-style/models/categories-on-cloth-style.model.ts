import { ObjectType, Field } from '@nestjs/graphql';
import { Category } from 'src/category/models/category.model';
import { ClothStyle } from 'src/cloth-style/models/cloth-style.model';
import { CategoriesOnClothStyleModel } from './categories-on-cloth-style';

@ObjectType()
export class CategoriesOnClothStyle extends CategoriesOnClothStyleModel {
  @Field(() => [Category])
    Category: Category[];

  @Field(() => [ClothStyle])
    ClothStyle: ClothStyle[];
}
