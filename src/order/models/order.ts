import { ObjectType, Field, Int } from '@nestjs/graphql';

import { ClothSexEnum } from '@prisma/client';

@ObjectType()
export class OrderModel {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  document_id: number | null;

  @Field(() => ClothSexEnum)
  cloth_sex: ClothSexEnum;

  @Field(() => Int, { nullable: true })
  product_id: number | null;

  @Field(() => String, { nullable: true })
  custom_size: string | null;

  @Field(() => String, { nullable: true })
  custom_model: string | null;

  @Field(() => String, { nullable: true })
  custom_knot: string | null;

  @Field(() => String, { nullable: true })
  custom_textile: string | null;

  @Field(() => String, { nullable: true })
  additional_materials: string | null;

  @Field(() => String, { nullable: true })
  artistic_description: string | null;

  @Field(() => Date, { nullable: false })
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | null;
}
