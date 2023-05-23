import { ObjectType, Field } from '@nestjs/graphql';
import { Address } from 'src/address/models/address.model';
import { SupplierModel } from './supplier';
import { User } from '../../user/models/user.model';

@ObjectType()
export class Supplier extends SupplierModel {
  @Field(() => User, { nullable: true })
    User?: User | null;

  @Field(() => Address, { nullable: true })
    Address?: Address[] | null;
}
