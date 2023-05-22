import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty, IsNumber, IsOptional, IsString,
} from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
    name: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    description?: string | null;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
    description_id?: number | undefined;

  @IsOptional()
  @IsArray()
  @Field(() => [Int], { nullable: true })
    array_of_document_ids?: number[];
}
