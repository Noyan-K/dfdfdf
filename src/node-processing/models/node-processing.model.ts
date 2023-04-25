import { ObjectType, Field } from '@nestjs/graphql';
import { Cart } from 'src/cart/models/cart.model';
import { NodeProcessingModel } from './node-processing';

@ObjectType()
export class NodeProcessing extends NodeProcessingModel {
  @Field(() => [Cart])
    Cart?: Cart[];
}
