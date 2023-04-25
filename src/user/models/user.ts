import {
  Field, Int, ObjectType, registerEnumType,
} from '@nestjs/graphql';
import { User, UserTypeEnum } from '@prisma/client';

@ObjectType()
export class UserModel implements User {
  @Field(() => Int)
    id: number;

  @Field(() => String)
    name: string;

  @Field(() => String, { nullable: true })
    user_name: string | null;

  @Field(() => Int, { nullable: true })
    document_id: number | null;

  @Field(() => Int, { nullable: true })
    currency_id: number | null;

  @Field(() => [Int], { defaultValue: [] })
    array_of_delivery_ids: number[];

  @Field(() => Int, { nullable: true })
    supplier_id: number | null;

  @Field(() => String)
    email: string;

  @Field(() => UserTypeEnum)
    type: UserTypeEnum;

  @Field(() => Date)
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at: Date | null;

  password: string | null;
}

registerEnumType(UserTypeEnum, {
  name: 'UserTypeEnum',
});
