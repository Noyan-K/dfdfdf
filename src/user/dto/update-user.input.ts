import { Field, InputType, Int } from '@nestjs/graphql';

import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @Field(() => String, { nullable: true })
  name?: string;

  @IsOptional()
  @IsEmail()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsOptional()
  @IsString()
  @Length(4, 100)
  @Field(() => String, { nullable: true })
  newPassword?: string;

  @IsOptional()
  @IsString()
  @Length(4, 100)
  @Field(() => String, { nullable: true })
  password?: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  @Field(() => [Int], { nullable: true })
  array_of_delivery_ids: number[];
}
