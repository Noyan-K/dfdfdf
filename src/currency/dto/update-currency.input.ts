import {
  Field, InputType, Int, PartialType,
} from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CreateCurrencyInput } from './create-currency.input';

@InputType()
export class UpdateCurrencyInput extends PartialType(CreateCurrencyInput) {
  @IsNumber()
  @Field(() => Int)
    id: number;
}
