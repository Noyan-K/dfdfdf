import {
  InputType, Field, Int, PartialType,
} from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
    id: number;
}
