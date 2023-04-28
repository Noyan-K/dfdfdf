import { ObjectType, Field } from '@nestjs/graphql';
import { CategoryDocumentModel } from './category-document';
import { CategoryModel } from './category';

@ObjectType()
export class CategoryDocument extends CategoryDocumentModel {
  @Field(() => CategoryModel)
    Category?: CategoryModel;
}
