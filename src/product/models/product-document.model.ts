import { ObjectType, Field } from '@nestjs/graphql';

import { ProductDocumentModel } from './product-document';
import { ProductModel } from './product';

import { Document } from '../../document/models/document.model';

@ObjectType()
export class ProductDocument extends ProductDocumentModel {
  @Field(() => ProductModel)
  Product?: ProductModel;

  @Field(() => Document, { nullable: true })
  Document?: Document | null;
}
