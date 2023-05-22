import { ObjectType, Field } from '@nestjs/graphql';
import { ProductModel } from '../../product/models/product';
import { DescriptionModel } from './description';

@ObjectType()
export class Description extends DescriptionModel {
  @Field(() => [ProductModel], { nullable: true })
    Product?: ProductModel[] | null;
}
