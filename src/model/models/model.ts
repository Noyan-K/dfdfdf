import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Model } from '@prisma/client';

@ObjectType()
export class ModelModel implements Model {
  @Field(() => Int)
    id: number;

  @Field(() => String)
    name: string;

  @Field(() => Int, { nullable: true })
    vendor_id: number | null;

  @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at: Date | null;
}
