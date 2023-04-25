import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsNumber, IsOptional, IsString, MaxLength,
} from 'class-validator';

@InputType()
export class CreateDescriptionInput {
  @IsString()
  @MaxLength(1000)
  @Field(() => String)
    text: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Int)
    language_id: number;
}
