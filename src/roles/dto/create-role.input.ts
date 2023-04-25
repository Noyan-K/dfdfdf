import { InputType, Field } from '@nestjs/graphql';
import { RolesEnum } from '@prisma/client';
import { IsEnum } from 'class-validator';

@InputType()
export class CreateRoleInput {
  @IsEnum(RolesEnum)
  @Field(() => RolesEnum)
    name: RolesEnum;
}
