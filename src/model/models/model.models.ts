import { ObjectType, Field } from '@nestjs/graphql';
import { ModelProductModel } from '../model-product/models/model-product';
import { ModelModel } from './model';
import { VendorModel } from '../../vendor/models/vendor';

@ObjectType()
export class Model extends ModelModel {
  @Field(() => VendorModel, { nullable: true })
    Vendor?: VendorModel | null;

  @Field(() => [ModelProductModel], { nullable: true })
    ModelProduct?: ModelProductModel[];
}
