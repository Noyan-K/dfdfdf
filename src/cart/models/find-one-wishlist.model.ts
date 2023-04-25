import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Cart } from './cart.model';

@ObjectType()
export class FindCart {
  @Field(() => Cart, { nullable: true })
    data: Cart | null;

  @Field(() => Int)
    total: number;
}
