import {
  Field, InputType, Int, PartialType,
} from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateCartInput } from './create-cart.input';

@InputType()
export class UpdateCartInput extends PartialType(CreateCartInput) {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
    id: number;
}
