import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CurrencyModel {
  @Field(() => Int)
    id: number;

  @Field(() => String, { nullable: true })
    name: string | null;

  @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at?: Date | null;
}
