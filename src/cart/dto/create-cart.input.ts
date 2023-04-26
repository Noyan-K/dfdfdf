import { InputType, Int, Field } from '@nestjs/graphql';
import { ClothSexEnum } from '@prisma/client';
import {
  IsEnum, IsNumber, IsOptional, IsString,
} from 'class-validator';

@InputType()
export class CreateCartInput {
  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
    contact_id: number | null;

  @IsOptional()
  @IsEnum(ClothSexEnum)
  @Field(() => ClothSexEnum, { nullable: true })
    cloth_sex: ClothSexEnum;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
    category_id: number | null;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    custom_size: string | null;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    custom_model: string | null;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    custom_knot: string | null;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    custom_textile: string | null;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    additional_materials: string | null;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
    artistic_description: string | null;
}
