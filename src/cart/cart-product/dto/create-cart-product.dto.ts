import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, Min } from 'class-validator';

@InputType()
export class CreateCartProductInput {
  @IsNumber()
  @Field(() => Int)
    cart_id: number;

  @IsNumber()
  @Field(() => Int)
    product_id: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Field(() => Int, { defaultValue: 1 })
    quantity?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Int)
    supplier_id?: number;
}
