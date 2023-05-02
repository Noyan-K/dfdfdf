import { ObjectType, Field } from '@nestjs/graphql';
import { CategoryDocumentModel } from './category-document';
import { CategoryModel } from './category';
import { Document } from '../../document/models/document.model';

@ObjectType()
export class CategoryDocument extends CategoryDocumentModel {
  @Field(() => CategoryModel)
    Category?: CategoryModel;

  @Field(() => Document, { nullable: true })
    Document?: Document | null;
}
