import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

import { CreateOrderSizeInput } from './create-order-size.input';

@InputType()
export class UpdateOrderSizeInput extends PartialType(CreateOrderSizeInput) {
    @Field(() => Int)
    id: number;
}
