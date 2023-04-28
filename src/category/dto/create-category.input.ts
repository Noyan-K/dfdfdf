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

  @IsNumber()
  @Field(() => Int)
    preview_document_id: number;

  @IsNumber()
  @Field(() => Int)
    mannequin_document_id: number;
}
