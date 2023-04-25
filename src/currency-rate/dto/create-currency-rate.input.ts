import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDate, IsNumber, Min } from 'class-validator';

@InputType()
export class CreateCurrencyRateInput {
  @IsNumber()
  @Field(() => Int)
    currency_id: number;

  @IsNumber()
  @Min(0)
  @Field(() => Number)
    rate: number;

  @IsDate()
  @Field(() => Date)
    date: Date;
}
