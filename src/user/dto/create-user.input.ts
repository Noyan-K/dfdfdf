import { InputType, Field, Int } from '@nestjs/graphql';
import { UserTypeEnum } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Length(2, 50)
  @Field(() => String)
    name: string;

  @IsEmail()
  @Field(() => String)
    email: string;

  @IsOptional()
  @IsString()
  @Length(4, 100)
  @Field(() => String)
    password: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Int)
    supplier_id: number;

  @IsOptional()
  @IsEnum(UserTypeEnum)
  @Field(() => UserTypeEnum)
    type: UserTypeEnum;
}
