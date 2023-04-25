import {
  InputType, Field, Int, PartialType,
} from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CreateRoleInput } from './create-role.input';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @IsNumber()
  @Field(() => Int)
    id: number;
}
