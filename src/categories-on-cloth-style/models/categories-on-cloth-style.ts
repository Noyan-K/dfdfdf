import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CategoriesOnClothStyleModel {
  @Field(() => Int)
    category_id: number;

  @Field(() => Int)
    clothes_style_id: number;
}
