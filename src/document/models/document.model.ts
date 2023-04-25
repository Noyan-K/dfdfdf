import {
  ObjectType, Field, Int,
} from '@nestjs/graphql';
import { DocumentTypeEnum } from '@prisma/client';

@ObjectType()
export class Document {
  @Field(() => Int)
    id: number;

  @Field(() => String)
    url: string;

  @Field(() => String)
    name: string;

  @Field(() => DocumentTypeEnum)
    type: DocumentTypeEnum;

  @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at?: Date | null;
}
