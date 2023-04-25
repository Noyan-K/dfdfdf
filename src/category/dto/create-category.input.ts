import { InputType, Int, Field } from '@nestjs/graphql';
import { ClothSexEnum } from '@prisma/client';
import {
  IsEnum, IsNumber, IsOptional, IsString,
} from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
    parent_id: number | null;

  @IsString()
  @Field(() => String)
    name: string;

  @IsOptional()
  @IsEnum(ClothSexEnum)
  @Field(() => ClothSexEnum, { nullable: true })
    sex: ClothSexEnum | null;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    description: string | null;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
    document_id: number | null;
}
