import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, Min } from 'class-validator';

@InputType()
export class UpdateCartProductInput {
  @IsNumber()
  @Field(() => Int)
    cart_id: number;

  @IsNumber()
  @Field(() => Int)
    product_id: number;

  @IsNumber()
  @Min(1)
  @Field(() => Int)
    quantity: number;

  @IsNumber()
  @Field(() => Int)
    supplier_id: number;
}
