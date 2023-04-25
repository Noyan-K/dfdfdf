import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDate, IsNumber } from 'class-validator';

@InputType()
export class FindUniqueCurrencyRateInput {
  @IsNumber()
  @Field(() => Int)
    currency_id: number;

  @IsDate()
  @Field(() => Date)
    date: Date;
}
