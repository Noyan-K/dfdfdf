import {
  ObjectType, Field, Int, registerEnumType,
} from '@nestjs/graphql';
import { AddressType } from '@prisma/client';

@ObjectType()
export class AddressModel {
  @Field(() => Int)
    id: number;

  @Field(() => Int)
    user_id: number;

  @Field(() => Int, { nullable: true })
    supplier_id?: number | null;

  @Field(() => AddressType)
    type: string;

  @Field(() => String)
    name: string;

  @Field(() => Int, { nullable: true })
    postcode?: number | null;

  @Field(() => String)
    country: string;

  @Field(() => String)
    region: string;

  @Field(() => String)
    city: string;

  @Field(() => String)
    street: string;

  @Field(() => Int)
    house_number: number;

  @Field(() => Int, { nullable: true })
    apartment_number_or_office?: number | null;

  @Field(() => Date, { nullable: false })
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at?: Date | null;
}

registerEnumType(AddressType, {
  name: 'AddressTypeEnum',
});
