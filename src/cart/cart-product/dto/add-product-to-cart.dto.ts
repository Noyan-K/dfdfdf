import { InputType, Field, Int } from '@nestjs/graphql';
import {
  IsNumber, IsOptional, IsString, Length, Min,
} from 'class-validator';

@InputType()
export class AddProductToCartInput {
  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
    cart_id?: number | null;

  @IsNumber()
  @Field(() => Int)
    product_id: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Field(() => Int)
    quantity?: number;

  @IsOptional()
  @IsString()
  @Length(2, 16)
  @Field(() => String, { nullable: true })
    name?: string | null;
}
