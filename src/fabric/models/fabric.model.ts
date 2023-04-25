import { ObjectType, Field } from '@nestjs/graphql';
import { Cart } from 'src/cart/models/cart.model';
import { FabricModel } from './fabric';

@ObjectType()
export class Fabric extends FabricModel {
  @Field(() => [Cart])
    Cart?: Cart[];
}
