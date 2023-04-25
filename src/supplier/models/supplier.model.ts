import { ObjectType, Field } from '@nestjs/graphql';
import { Address } from 'src/address/models/address.model';
import { Currency } from 'src/currency/models/currency.model';
import { SupplierModel } from './supplier';
import { SupplierProductPriceModel } from '../../supplier-product-price/models/supplier-product-price';
import { User } from '../../user/models/user.model';

@ObjectType()
export class Supplier extends SupplierModel {
  @Field(() => [SupplierProductPriceModel])
    SupplierProductPrice?: SupplierProductPriceModel[];

  @Field(() => User, { nullable: true })
    User?: User | null;

  @Field(() => Address, { nullable: true })
    Address?: Address[] | null;

  @Field(() => Currency)
    Currency?: Currency;
}
