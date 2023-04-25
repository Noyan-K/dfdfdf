import {
  InputType, Int, Field, GraphQLISODateTime,
} from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateSupplierProductPriceInput {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
    product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
    supplier_id: number;

  @IsNotEmpty()
  @IsDate()
  @Field(() => GraphQLISODateTime)
    price_date: Date;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
    price: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
    currency_id: number;
}
