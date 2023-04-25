import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DescriptionModel {
  @Field(() => Int)
    id: number;

  @Field(() => String)
    text: string;

  @Field(() => Int)
    language_id: number;

  @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at?: Date | null;
}
