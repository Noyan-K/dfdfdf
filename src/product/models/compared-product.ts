import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Product } from './product.models';
import { IsOptional } from 'class-validator';

@ObjectType()
export class ComparedProduct extends Product {
  @IsOptional()
  @Field(() => Float, { nullable: true })
  supplier_price?: number;

  @Field(() => Float)
  supplier_with_price: number;

  @Field(() => Float)
  price_difference: number;
}
