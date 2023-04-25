import { InputType, Int, Field } from '@nestjs/graphql';
import { ClothSexEnum } from '@prisma/client';
import {
  IsEnum, IsNumber, IsOptional, IsString,
} from 'class-validator';

@InputType()
export class CreateCartInput {
  @IsNumber()
  @Field(() => Int)
    contact_id: number;

  @IsEnum(ClothSexEnum)
  @Field(() => ClothSexEnum)
    cloth_sex: ClothSexEnum;

  @IsNumber()
  @Field(() => Int)
    category_id: number;

  @IsNumber()
  @Field(() => Int)
    size_id: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    custom_size: string;

  @IsNumber()
  @Field(() => Int)
    cloth_style_id: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    cloth_style_requirements: string;

  @IsNumber()
  @Field(() => Int)
    node_processing_id: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    node_processing_requirements: string;

  @IsNumber()
  @Field(() => Int)
    fabric_id: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    fabric_requirements: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    additional_materials: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    artistic_description_of_the_model: string;
}
