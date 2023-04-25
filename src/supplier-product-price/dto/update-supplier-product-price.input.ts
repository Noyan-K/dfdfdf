import {
  Field,
  GraphQLISODateTime,
  InputType,
  Int,
  PartialType,
} from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateSupplierProductPriceInput } from './create-supplier-product-price.input';

@InputType()
export class UpdateSupplierProductPriceInput extends PartialType(
  CreateSupplierProductPriceInput,
) {
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
}
