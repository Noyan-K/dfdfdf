import {
  InputType, Field, Int, PartialType,
} from '@nestjs/graphql';
import { CreateCartSizeInput } from './create-cart-size.input';

@InputType()
export class UpdateCartSizeInput extends PartialType(CreateCartSizeInput) {
  @Field(() => Int)
    id: number;
}
