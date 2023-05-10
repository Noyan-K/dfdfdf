import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested,
} from 'class-validator';

@InputType()
export class CreateProductInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
    vendor_partnumber: string;

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
  @IsNumber()
  @Field(() => Int, { nullable: true })
    vendor_id?: number | undefined;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Field(() => [Int], { nullable: true })
    array_of_document_ids?: number[];

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
    model_id?: number | undefined;
}
