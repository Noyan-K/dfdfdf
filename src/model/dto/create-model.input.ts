import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateModelInput {
  @IsString()
  @Field(() => String)
    name: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
    vendor_id: number | null;
}
