import { ObjectType, Field } from '@nestjs/graphql';
import { ModelModel } from 'src/model/models/model';
import { VendorModel } from 'src/vendor/models/vendor';
import { ProductModel } from './product';

@ObjectType()
export class SearchResultModel {
  @Field(() => [ProductModel])
    receivedProducts: ProductModel[];

  @Field(() => [ModelModel])
    receivedModels: ModelModel[];

  @Field(() => [VendorModel])
    receivedVendors: VendorModel[];
}
