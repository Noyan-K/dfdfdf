import { Field, ObjectType } from '@nestjs/graphql';
import { Address } from 'src/address/models/address.model';
import { Currency } from 'src/currency/models/currency.model';
import { UserModel } from './user';
import { SupplierModel } from '../../supplier/models/supplier';
import { CartModel } from '../../cart/models/cart';
import { UserRole } from '../../roles/models/user-role.models';
import { Profile } from '../../profile/models/profile.model';
import { Document } from '../../document/models/document.model';

@ObjectType()
export class User extends UserModel {
  @Field(() => Document, { nullable: true })
    Document?: Document | null;

  @Field(() => SupplierModel, { nullable: true })
    Supplier?: SupplierModel | null;

  @Field(() => [CartModel], { nullable: true })
    Cart?: CartModel[];

  @Field(() => [UserRole], { nullable: true })
    UserRole?: UserRole[];

  @Field(() => Profile, { nullable: true })
    Profile?: Profile | null;

  @Field(() => Address, { nullable: true })
    Address?: Address[] | null;

  @Field(() => Currency)
    Currency?: Currency;
}
