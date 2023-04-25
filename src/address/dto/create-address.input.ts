import { InputType, Int, Field } from '@nestjs/graphql';
import { AddressType } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateAddressInput {
  @IsEnum(AddressType)
  @Field(() => AddressType)
    type: AddressType;

  @IsString()
  @Field(() => String)
    name: string;

  @IsNumber()
  @Field(() => Int, { nullable: true })
    postcode?: number | null;

  @IsString()
  @Field(() => String)
    country: string;

  @IsString()
  @Field(() => String)
    region: string;

  @IsString()
  @Field(() => String)
    city: string;

  @IsString()
  @Field(() => String)
    street: string;

  @IsNumber()
  @Field(() => Int)
    house_number: number;

  @IsNumber()
  @Field(() => Int, { nullable: true })
    apartment_number_or_office?: number | null;
}
