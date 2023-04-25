import {
  ObjectType,
  Field,
  Int,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { CurrencyRate } from '@prisma/client';

@ObjectType()
export class CurrencyRateModel implements CurrencyRate {
  @Field(() => Int)
    currency_id: number;

  @Field(() => Float, { nullable: true })
    rate: number | null;

  @Field(() => GraphQLISODateTime)
    date: Date;

  @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at: Date | null;
}
