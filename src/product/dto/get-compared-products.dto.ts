import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Product } from '../models/product.models';
import { GetProductsDto } from './get-products.dto';
import { ComparedProduct } from '../models/compared-product';

@ObjectType()
export class GetComparedProductsDto extends GetProductsDto {
  @Field(() => [ComparedProduct], { nullable: true })
    products: ComparedProduct[];
}
