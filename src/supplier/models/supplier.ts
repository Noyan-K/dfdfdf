import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SupplierModel {
  @Field(() => Int)
    id: number;

  // @Field(() => String, { deprecationReason: 'пока используем name из User' })
  name: string;

  @Field(() => Int, { nullable: true })
    currency_id?: number | null;

  @Field(() => Boolean, { defaultValue: false })
    deliver_goods_yourself: boolean;

  @Field(() => [Int], { defaultValue: [] })
    array_of_delivery_ids: number[];

  @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at?: Date | null;
}
