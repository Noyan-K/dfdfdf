import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCurrencyRateInput } from './create-currency-rate.input';

@InputType()
export class UpdateCurrencyRateInput extends PartialType(
  CreateCurrencyRateInput,
) {}
