import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateContactInput {
  @IsString()
  @Field(() => String)
    name: string;

  @IsEmail()
  @Field(() => String)
    email: string;
}
