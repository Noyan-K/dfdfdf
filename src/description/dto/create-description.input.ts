import { InputType, Field } from '@nestjs/graphql';
import {
  IsString, MaxLength,
} from 'class-validator';

@InputType()
export class CreateDescriptionInput {
  @IsString()
  @MaxLength(1000)
  @Field(() => String)
    text: string;
}
