import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class FilterProductsInput {
  @IsOptional()
  @IsString()
  @Field(() => String)
    search: string;
}
