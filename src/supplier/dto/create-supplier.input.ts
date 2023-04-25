import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateSupplierInput {
  @IsString()
  @Field(() => String)
    name: string;
}
