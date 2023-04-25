import {
  ObjectType, Field, Int, registerEnumType,
} from '@nestjs/graphql';
import { Category, ClothSexEnum } from '@prisma/client';

@ObjectType()
export class CategoryModel implements Category {
  @Field(() => Int)
    id: number;

  @Field(() => Int, { nullable: true })
    parent_id: number | null;

  @Field(() => String)
    name: string;

  @Field(() => ClothSexEnum, { nullable: true })
    sex: ClothSexEnum | null;

  @Field(() => String, { nullable: true })
    description: string | null;

  @Field(() => Int, { nullable: true })
    document_id: number | null;

  @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at: Date | null;
}

registerEnumType(ClothSexEnum, {
  name: 'ClothSexEnum',
});
