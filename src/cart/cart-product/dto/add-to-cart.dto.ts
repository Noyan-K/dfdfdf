import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AddToCart {
  @Field(() => Int)
    cart_id: number;

  @Field(() => Int, { nullable: true })
    total?: number;
}
