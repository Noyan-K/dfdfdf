import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoriesOnClothStyleInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
