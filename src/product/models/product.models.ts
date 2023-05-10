import { ObjectType, Field } from '@nestjs/graphql';
import { ProductModel } from './product';
import { Vendor } from '../../vendor/models/vendor.models';
import { SupplierProductPrice } from '../../supplier-product-price/models/supplier-product-price.models';
import { ModelProduct } from '../../model/model-product/models/model-product.model';
import { Description } from '../../description/models/description.model';
import { Category } from '../../category/models/category.model';
import { ProductDocument } from './product-document.model';

@ObjectType()
export class Product extends ProductModel {
  @Field(() => Vendor, { nullable: true })
    Vendor?: Vendor | null;

  @Field(() => [SupplierProductPrice], { nullable: true })
    SupplierProductPrice?: SupplierProductPrice[] | null;

  @Field(() => [ModelProduct], { nullable: true })
    ModelProduct?: ModelProduct[];

  @Field(() => Description, { nullable: true })
    Description?: Description | null;

  @Field(() => Category, { nullable: true })
    Category?: Category | null;

  @Field(() => [ProductDocument], { nullable: true })
    ProductDocument?: ProductDocument[];
}
