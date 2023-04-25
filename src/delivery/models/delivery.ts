import {
  ObjectType, Field, Int, registerEnumType,
} from '@nestjs/graphql';
import { DeliveryTypeEnum } from '@prisma/client';

@ObjectType()
export class DeliveryModel {
  @Field(() => Int)
    id: number;

  @Field(() => String)
    name: string;

  @Field(() => DeliveryTypeEnum)
    type: DeliveryTypeEnum;

  @Field(() => Int, { nullable: true })
    parent_id?: number | null;

  @Field(() => Date, { nullable: false })
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at?: Date | null;
}

registerEnumType(DeliveryTypeEnum, {
  name: 'DeliveryTypeEnum',
});
