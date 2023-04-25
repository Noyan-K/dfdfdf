import { ObjectType, Field } from '@nestjs/graphql';
import { ModelProductModel } from './model-product';
import { Model } from '../../models/model.models';
import { ProductModel } from '../../../product/models/product';

@ObjectType()
export class ModelProduct extends ModelProductModel {
  @Field(() => Model)
    Model?: Model;

  @Field(() => ProductModel)
    Product?: ProductModel;
}
