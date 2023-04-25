import { ObjectType, Field } from '@nestjs/graphql';
import { LanguageModel } from './language';
import { DescriptionModel } from '../../description/models/description';

@ObjectType()
export class Language extends LanguageModel {
  @Field(() => [DescriptionModel])
    Description?: DescriptionModel[];
}
