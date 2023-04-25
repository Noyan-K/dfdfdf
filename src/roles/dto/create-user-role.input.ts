import { InputType, Field, Int } from '@nestjs/graphql';
import { RolesEnum } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';

@InputType()
export class CreateUserRoleInput {
  @IsNumber()
  @Field(() => Int)
    user_id: number;

  @IsEnum(RolesEnum)
  @Field(() => RolesEnum)
    role_name: RolesEnum;
}
