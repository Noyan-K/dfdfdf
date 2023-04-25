import {
  ObjectType, Field, Int,
} from '@nestjs/graphql';
import { ClothSexEnum } from '@prisma/client';

@ObjectType()
export class CartModel {
  @Field(() => Int)
    id: number;

  @Field(() => Int)
    contact_id: number;

  @Field(() => ClothSexEnum)
    cloth_sex: ClothSexEnum;

  @Field(() => Int)
    category_id: number;

  @Field(() => Int)
    size_id: number;

  @Field(() => String, { nullable: true })
    custom_size: string | null;

  @Field(() => Int)
    cloth_style_id: number;

  @Field(() => String, { nullable: true })
    cloth_style_requirements: string | null;

  @Field(() => Int)
    node_processing_id: number;

  @Field(() => String, { nullable: true })
    node_processing_requirements: string | null;

  @Field(() => Int)
    fabric_id: number;

  @Field(() => String, { nullable: true })
    fabric_requirements: string | null;

  @Field(() => String, { nullable: true })
    additional_materials: string | null;

  @Field(() => String, { nullable: true })
    artistic_description_of_the_model: string | null;

  @Field(() => Date, { nullable: false })
    created_at: Date;

  @Field(() => Date)
    updated_at: Date;

  @Field(() => Date, { nullable: true })
    deleted_at?: Date | null;
}
