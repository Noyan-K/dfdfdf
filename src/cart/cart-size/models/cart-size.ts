import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CartSizeModel {
  @Field(() => Int)
    size_id: number;

  @Field(() => Int)
    cart_id: number;

  @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at: Date | null;
}
