import { ObjectType, Field } from '@nestjs/graphql';

import { Supplier } from 'src/supplier/models/supplier.model';

import { AddressModel } from './address';

import { User } from '../../user/models/user.model';

@ObjectType()
export class Address extends AddressModel {
  @Field(() => User)
  User?: User;

  @Field(() => Supplier)
  Supplier?: Supplier | null;
}
