import { InputType, Int, Field } from '@nestjs/graphql';
import { DeliveryTypeEnum } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateDeliveryInput {
  @IsString()
  @Field(() => String)
    name: string;

  @IsEnum(DeliveryTypeEnum)
  @Field(() => DeliveryTypeEnum)
    type: DeliveryTypeEnum;

  @IsNumber()
  @Field(() => Int)
    parent_id: number;
}
