import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../models/product.models';

@ObjectType()
export class GetProductsDto {
  @Field(() => Int)
    total: number;

  @Field(() => [Product], { nullable: true })
    products: Product[];
}
