import { ObjectType, Field } from '@nestjs/graphql';
import { SupplierProductPriceModel } from './supplier-product-price';
import { CurrencyModel } from '../../currency/models/currency';
import { ProductModel } from '../../product/models/product';
import { Supplier } from '../../supplier/models/supplier.model';

@ObjectType()
export class SupplierProductPrice extends SupplierProductPriceModel {
  @Field(() => CurrencyModel, { nullable: true })
    Currency?: CurrencyModel | null;

  @Field(() => ProductModel, { nullable: true })
    Product?: ProductModel;

  @Field(() => Supplier, { nullable: true })
    Supplier?: Supplier;
}
