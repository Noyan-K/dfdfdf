import { InputType, Field, Int } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';

@InputType()
export class FilterProductsInput {
  @IsOptional()
  @IsString()
  @Field(() => String)
    search: string;

  @IsOptional()
  @IsArray()
  @Field(() => [Int], { nullable: true })
    vendor_ids?: number[];

  @IsOptional()
  @IsArray()
  @Field(() => [Int], { nullable: true })
    model_ids?: number[];
}
