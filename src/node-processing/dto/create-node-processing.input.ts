import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateNodeProcessingInput {
  @IsString()
  @Field(() => String)
    name: string;
}
