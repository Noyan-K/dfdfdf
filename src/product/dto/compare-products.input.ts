import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsNumber } from 'class-validator';

@InputType()
export class CompareProductsInput {
  @IsOptional()
  @Field(() => Int, { nullable: true })
    supplier_id?: number;

  @IsNumber()
  @Field(() => Int)
    supplier_id_with: number;
}
