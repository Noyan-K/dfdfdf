import { Field, ObjectType } from '@nestjs/graphql';

import { Address } from 'src/address/models/address.model';

import { UserModel } from './user';

import { SupplierModel } from '../../supplier/models/supplier';
import { OrderModel } from '../../order/models/order';
import { UserRole } from '../../roles/models/user-role.models';
import { Document } from '../../document/models/document.model';

@ObjectType()
export class User extends UserModel {
  @Field(() => Document, { nullable: true })
  Document?: Document | null;

  @Field(() => SupplierModel, { nullable: true })
  Supplier?: SupplierModel | null;

  @Field(() => [OrderModel], { nullable: true })
  Cart?: OrderModel[];

  @Field(() => [UserRole], { nullable: true })
  UserRole?: UserRole[];

  @Field(() => Address, { nullable: true })
  Address?: Address[] | null;
}
