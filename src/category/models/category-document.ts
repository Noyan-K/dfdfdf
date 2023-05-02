import {
  ObjectType, Field, Int, registerEnumType,
} from '@nestjs/graphql';
import { DocumentTypeOfCategoryEnum } from '@prisma/client';

@ObjectType()
export class CategoryDocumentModel {
  @Field(() => Int)
    id: number;

  @Field(() => Int)
    category_id: number;

  @Field(() => Int)
    document_id: number;

  @Field(() => DocumentTypeOfCategoryEnum)
    type: DocumentTypeOfCategoryEnum;

  @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at: Date | null;
}

registerEnumType(DocumentTypeOfCategoryEnum, {
  name: 'DocumentTypeOfCategoryEnum',
});
