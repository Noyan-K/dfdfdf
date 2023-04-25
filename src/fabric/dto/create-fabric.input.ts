import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateFabricInput {
  @IsString()
  @Field(() => String)
    name: string;

  @IsString()
  @Field(() => String, { nullable: true })
    description: string | null;
}
