import { ObjectType, Field } from '@nestjs/graphql';
import { CartSizeModel } from './cart-size';
import { Size } from '../../../size/models/size.model';
import { CartModel } from '../../models/cart';

@ObjectType()
export class CartSize extends CartSizeModel {
  @Field(() => CartModel)
    Cart?: CartModel;

  @Field(() => Size)
    Size?: Size;
}
