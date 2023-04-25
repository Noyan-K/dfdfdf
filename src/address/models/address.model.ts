import { ObjectType, Field } from '@nestjs/graphql';
import { Supplier } from 'src/supplier/models/supplier.model';
import { User } from '../../user/models/user.model';
import { AddressModel } from './address';

@ObjectType()
export class Address extends AddressModel {
  @Field(() => User)
    User?: User;

  @Field(() => Supplier)
    Supplier?: Supplier | null;
}
