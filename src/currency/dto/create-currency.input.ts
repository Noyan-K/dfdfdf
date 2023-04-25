import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateCurrencyInput {
  @IsOptional()
  @IsString()
  @MaxLength(3)
  @Field(() => String)
    name?: string | null;
}
