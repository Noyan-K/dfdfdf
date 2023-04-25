import {
  InputType, Field, Int, PartialType,
} from '@nestjs/graphql';
import {
  IsBoolean, IsNumber, IsOptional,
} from 'class-validator';
import { CreateSupplierInput } from './create-supplier.input';

@InputType()
export class UpdateSupplierInput extends PartialType(CreateSupplierInput) {
  @IsNumber()
  @Field(() => Int)
    id: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
    currency_id?: number | null;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
    deliver_goods_yourself: boolean;

  @IsOptional()
  @IsNumber({}, { each: true })
  @Field(() => [Int], { nullable: true })
    array_of_delivery_ids: number[];
}
