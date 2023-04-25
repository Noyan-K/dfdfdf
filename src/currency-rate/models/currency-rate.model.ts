import { ObjectType, Field } from '@nestjs/graphql';
import { CurrencyModel } from '../../currency/models/currency';
import { CurrencyRateModel } from './currency-rate';

@ObjectType()
export class CurrencyRate extends CurrencyRateModel {
  @Field(() => CurrencyModel)
    Currency?: CurrencyModel;
}
