import { ObjectType, Field } from '@nestjs/graphql';
import { ProductModel } from './product';
import { Description } from '../../description/models/description.model';
import { Category } from '../../category/models/category.model';
import { ProductDocument } from './product-document.model';

@ObjectType()
export class Product extends ProductModel {
  @Field(() => Description, { nullable: true })
    Description?: Description | null;

  @Field(() => Category, { nullable: true })
    Category?: Category | null;

  @Field(() => [ProductDocument], { nullable: true })
    ProductDocument?: ProductDocument[];
}
