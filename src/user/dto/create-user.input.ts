import { InputType, Field } from '@nestjs/graphql';

import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
    @IsEmail()
    @Field(() => String)
    email: string;
}
