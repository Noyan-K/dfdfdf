import { ObjectType, Field } from '@nestjs/graphql';
import { ProductModel } from './product';

@ObjectType()
export class SearchResultModel {
  @Field(() => [ProductModel])
    receivedProducts: ProductModel[];
}
