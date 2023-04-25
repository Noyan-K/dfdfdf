import { CreateCategoriesOnClothStyleInput } from './create-categories-on-cloth-style.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoriesOnClothStyleInput extends PartialType(CreateCategoriesOnClothStyleInput) {
  @Field(() => Int)
  id: number;
}
