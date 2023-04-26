import { CreateCartSizeInput } from './create-cart-size.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCartSizeInput extends PartialType(CreateCartSizeInput) {
  @Field(() => Int)
  id: number;
}
