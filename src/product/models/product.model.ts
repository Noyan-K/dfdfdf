import { ObjectType, Field } from '@nestjs/graphql';
import { Order } from 'src/order/models/order.model';
import { ProductModel } from './product';
import { ProductDocument } from './product-document.model';

@ObjectType()
export class Product extends ProductModel {
  @Field(() => [Product], { nullable: true })
    Children?: Product[] | null;

  @Field(() => Product, { nullable: true })
    Parent?: Product | null;

  @Field(() => [Order], { nullable: true })
    Order?: Order[] | null;

  @Field(() => [ProductDocument], { nullable: true })
    ProductDocument?: ProductDocument[];
}
