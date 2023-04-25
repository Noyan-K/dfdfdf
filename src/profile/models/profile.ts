import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Profile } from '@prisma/client';

@ObjectType()
export class ProfileModel implements Profile {
  @Field(() => Int)
    id: number;

  @Field(() => Int)
    user_id: number;

  @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at: Date | null;
}
