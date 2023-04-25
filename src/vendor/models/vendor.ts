import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Vendor } from '@prisma/client';

@ObjectType()
export class VendorModel implements Vendor {
  @Field(() => Int)
    id: number;

  @Field(() => String)
    name: string;

  @Field(() => Int, { nullable: true })
    document_id: number | null;

  @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at: Date | null;
}
