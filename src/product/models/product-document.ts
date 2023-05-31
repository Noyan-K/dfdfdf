import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';

import { DocumentTypeOfProductEnum } from '@prisma/client';

@ObjectType()
export class ProductDocumentModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  product_id: number;

  @Field(() => Int)
  document_id: number;

  @Field(() => DocumentTypeOfProductEnum)
  type: DocumentTypeOfProductEnum;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at: Date | null;
}

registerEnumType(DocumentTypeOfProductEnum, {
  name: 'DocumentTypeOfProductEnum',
});
