import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class DeleteCartProductInput {
  @IsNumber()
  @Field(() => Int)
    cart_id: number;

  @IsNumber()
  @Field(() => Int)
    product_id: number;
}
