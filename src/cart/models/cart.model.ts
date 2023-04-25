import { ObjectType, Field } from '@nestjs/graphql';
import { Contact } from 'src/contact/models/contact.model';
import { Category } from 'src/category/models/category.model';
import { Size } from 'src/size/models/size.model';
import { ClothStyle } from 'src/cloth-style/models/cloth-style.model';
import { NodeProcessing } from 'src/node-processing/models/node-processing.model';
import { Fabric } from 'src/fabric/models/fabric.model';
import { CartModel } from './cart';
import { CartProduct } from '../cart-product/models/cart-product.model';
import { User } from '../../user/models/user.model';

@ObjectType()
export class Cart extends CartModel {
  @Field(() => [CartProduct], { nullable: true })
    CartProducts?: CartProduct[] | null;

  @Field(() => User, { nullable: true })
    Contact?: Contact | null;

  @Field(() => Category, { nullable: true })
    Category?: Contact | null;

  @Field(() => Size, { nullable: true })
    Size?: Contact | null;

  @Field(() => ClothStyle, { nullable: true })
    ClothStyle?: ClothStyle | null;

  @Field(() => NodeProcessing, { nullable: true })
    NodeProcessing?: NodeProcessing | null;

  @Field(() => Fabric, { nullable: true })
    Fabric?: Fabric | null;
}
