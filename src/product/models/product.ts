import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '@prisma/client';

@ObjectType()
export class ProductModel implements Product {
  @Field(() => Int)
    id: number;

  @Field(() => Int, { nullable: true })
    vendor_id: number | null;

  @Field(() => String)
    vendor_partnumber: string;

  @Field(() => String)
    name: string;

  @Field(() => Int, { nullable: true })
    description_id: number | null;

  @Field(() => Int, { nullable: true })
    category_id: number | null;

  @Field(() => String, { nullable: true })
    description: string | null;

  @Field(() => [Int], { nullable: true })
    document_id: number[];

  @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at: Date | null;
}
