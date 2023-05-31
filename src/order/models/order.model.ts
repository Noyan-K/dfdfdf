import { ObjectType, Field } from '@nestjs/graphql';

import { Product } from 'src/product/models/product.model';
import { Document } from 'src/document/models/document.model';

import { OrderModel } from './order';

import { OrderSize } from '../order-size/models/order-size.model';

@ObjectType()
export class Order extends OrderModel {
  @Field(() => Product, { nullable: true })
  Product?: Product;

  @Field(() => [OrderSize], { nullable: true })
  OrderSize?: OrderSize[];

  @Field(() => [Document], { nullable: true })
  Document?: Document | null;
}
