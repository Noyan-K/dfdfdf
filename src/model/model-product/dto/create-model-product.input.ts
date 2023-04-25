import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateModelProductInput {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
    product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
    model_id: number;
}
