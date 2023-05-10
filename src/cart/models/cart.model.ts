import { ObjectType, Field } from '@nestjs/graphql';
import { Contact } from 'src/contact/models/contact.model';
import { Category } from 'src/category/models/category.model';
import { Document } from 'src/document/models/document.model';
import { CartModel } from './cart';
import { CartProduct } from '../cart-product/models/cart-product.model';
import { CartSize } from '../cart-size/models/cart-size.model';

@ObjectType()
export class Cart extends CartModel {
  @Field(() => [CartProduct], { nullable: true })
    CartProducts?: CartProduct[] | null;

  @Field(() => Contact, { nullable: true })
    Contact?: Contact | null;

  @Field(() => Category, { nullable: true })
    Category?: Category;

  @Field(() => [CartSize], { nullable: true })
    CartSize?: CartSize[];

  @Field(() => [Document], { nullable: true })
    Document?: Document | null;
}
