import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsNotEmpty, IsNumber, IsOptional, IsString,
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
  @IsNumber()
  @Field(() => Int, { nullable: true })
    model_id?: number | undefined;
}
