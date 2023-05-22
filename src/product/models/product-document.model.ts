import { ObjectType, Field } from '@nestjs/graphql';
import { Document } from '../../document/models/document.model';
import { ProductDocumentModel } from './product-document';

@ObjectType()
export class ProductDocument extends ProductDocumentModel {
  @Field(() => Document)
    Document?: Document;
}
