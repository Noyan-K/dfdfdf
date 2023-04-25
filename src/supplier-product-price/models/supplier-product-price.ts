import {
  ObjectType,
  Field,
  Int,
  Float,
  GraphQLISODateTime,
} from '@nestjs/graphql';

@ObjectType()
export class SupplierProductPriceModel {
  @Field(() => Int)
    product_id: number;

  @Field(() => Int)
    supplier_id: number;

  @Field(() => GraphQLISODateTime)
    price_date: Date;

  @Field(() => Float)
    price: number;

  @Field(() => Int)
    currency_id: number;

  @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at?: Date | null;
}
