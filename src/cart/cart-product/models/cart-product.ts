import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CartProductModel {
  @Field(() => Int)
    id: number;

  @Field(() => Int)
    cart_id: number;

  @Field(() => Int, { nullable: true })
    product_id?: number | null;

  @Field(() => Int, { defaultValue: 1 })
    quantity: number;

  @Field(() => Int, { nullable: true })
    supplier_id?: number | null;

  @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at?: Date | null;
}
