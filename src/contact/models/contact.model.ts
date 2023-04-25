import { ObjectType, Field } from '@nestjs/graphql';
import { Cart } from 'src/cart/models/cart.model';
import { ContactModel } from './contact';

@ObjectType()
export class Contact extends ContactModel {
  @Field(() => [Cart])
    Cart?: Cart[];
}
