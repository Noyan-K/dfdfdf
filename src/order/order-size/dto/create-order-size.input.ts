import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateOrderSizeInput {
  @IsNumber()
  @Field(() => Int)
    size_id: number;

  @IsNumber()
  @Field(() => Int)
    order_id: number;
}
