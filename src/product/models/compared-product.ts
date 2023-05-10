import {
  ObjectType, Field, Float,
} from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { Product } from './product.models';

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
