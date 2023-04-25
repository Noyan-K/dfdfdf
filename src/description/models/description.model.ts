import { ObjectType, Field } from '@nestjs/graphql';
import { ProductModel } from '../../product/models/product';
import { DescriptionModel } from './description';
import { LanguageModel } from '../../language/models/language';

@ObjectType()
export class Description extends DescriptionModel {
  @Field(() => LanguageModel)
    Language?: LanguageModel;

  @Field(() => [ProductModel], { nullable: true })
    Product?: ProductModel[] | null;
}
