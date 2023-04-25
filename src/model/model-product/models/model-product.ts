import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ModelProduct } from '@prisma/client';

@ObjectType()
export class ModelProductModel implements ModelProduct {
  @Field(() => Int)
    product_id: number;

  @Field(() => Int)
    model_id: number;

  @Field(() => Int)
    created_at: Date;

  @Field(() => Int)
    updated_at: Date;

  @Field(() => Int, { nullable: true })
    deleted_at: Date | null;
}
