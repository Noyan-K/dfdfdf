import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import { Supplier } from 'src/supplier/models/supplier.model';
import { CurrencyModel } from './currency';
import { CurrencyRateModel } from '../../currency-rate/models/currency-rate';
import { SupplierProductPriceModel } from '../../supplier-product-price/models/supplier-product-price';

@ObjectType()
export class Currency extends CurrencyModel {
  @Field(() => [CurrencyRateModel])
    CurrencyRate?: CurrencyRateModel[];

  @Field(() => [SupplierProductPriceModel], { nullable: true })
    SupplierProductPrice?: SupplierProductPriceModel[] | null;

  @Field(() => [User])
    User?: [User];

  @Field(() => [Supplier])
    Supplier?: [Supplier];
}
