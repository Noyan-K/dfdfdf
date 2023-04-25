import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @IsNumber()
  @Field(() => Int)
    user_id: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
    supplier_id?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
    document_id?: number;
}
