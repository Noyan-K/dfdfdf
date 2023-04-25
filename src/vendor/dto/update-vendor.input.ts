import {
  InputType, Field, Int, PartialType,
} from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateVendorInput } from './create-vendor.input';

@InputType()
export class UpdateVendorInput extends PartialType(CreateVendorInput) {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
    id: number;
}
