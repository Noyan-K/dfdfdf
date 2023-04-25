import { ObjectType, Field } from '@nestjs/graphql';
import { VendorModel } from './vendor';
import { ProductModel } from '../../product/models/product';
import { Document } from '../../document/models/document.model';
import { Model } from '../../model/models/model.models';

@ObjectType()
export class Vendor extends VendorModel {
  @Field(() => Document, { nullable: true })
    Document?: Document;

  @Field(() => [Model], { nullable: true })
    Model?: Model[];

  @Field(() => [ProductModel], { nullable: true })
    Product?: ProductModel[];
}
