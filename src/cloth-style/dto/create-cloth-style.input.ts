import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateClothStyleInput {
  @IsString()
  @Field(() => String)
    name: string;
}
