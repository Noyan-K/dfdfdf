import { ObjectType, Field } from '@nestjs/graphql';

import { OrderSizeModel } from './order-size';

import { Size } from '../../../size/models/size.model';
import { OrderModel } from '../../models/order';

@ObjectType()
export class OrderSize extends OrderSizeModel {
  @Field(() => OrderModel)
  Order?: OrderModel;

  @Field(() => Size)
  Size?: Size;
}
