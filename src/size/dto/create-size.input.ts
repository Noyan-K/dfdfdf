import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateSizeInput {
  @IsString()
  @Field(() => String)
    name: string;

  @Field(() => Int)
    russian_size: number;

  @IsString()
  @Field(() => String)
    chest_girth: string;

  @IsString()
  @Field(() => String)
    waits_girth: string;

  @IsString()
  @Field(() => String)
    hips_girth: string;
}
