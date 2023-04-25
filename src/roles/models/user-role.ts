import {
  ObjectType, Field, Int,
} from '@nestjs/graphql';
import { RolesEnum } from '@prisma/client';

@ObjectType()
export class UserRoleModel {
  @Field(() => Int)
    id: number;

  @Field(() => Int)
    user_id: number;

  @Field(() => RolesEnum)
    role_name: RolesEnum;
}
