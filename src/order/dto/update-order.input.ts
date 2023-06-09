import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { IsNotEmpty, IsNumber } from 'class-validator';

import { CreateOrderInput } from './create-order.input';

@InputType()
export class UpdateOrderInput extends PartialType(CreateOrderInput) {
    @IsNotEmpty()
    @IsNumber()
    @Field(() => Int)
    id: number;
}
