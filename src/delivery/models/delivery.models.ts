import { ObjectType, Field } from '@nestjs/graphql';
import { DeliveryModel } from './delivery';

@ObjectType()
export class Delivery extends DeliveryModel {
  @Field(() => [Delivery])
    Children?: Delivery;

  @Field(() => Delivery, { nullable: true })
    Parent?: Delivery | null;
}
