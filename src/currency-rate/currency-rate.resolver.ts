import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { CurrencyRateService } from './currency-rate.service';
import { CurrencyRate } from './models/currency-rate.model';
import { CreateCurrencyRateInput } from './dto/create-currency-rate.input';
import { UpdateCurrencyRateInput } from './dto/update-currency-rate.input';
import { FindUniqueCurrencyRateInput } from './dto/find-unique-currency-rate.input';
import { CurrencyRateModel } from './models/currency-rate';

@Resolver(() => CurrencyRate)
export class CurrencyRateResolver {
  constructor(private readonly currencyRateService: CurrencyRateService) {}

  @Mutation(() => CurrencyRate)
  createCurrencyRate(
    @Args('createCurrencyRateInput')
      createCurrencyRateInput: CreateCurrencyRateInput,
  ): Promise<CurrencyRateModel> {
    return this.currencyRateService.create(createCurrencyRateInput);
  }

  @Query(() => [CurrencyRate], { name: 'currencyRates' })
  findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
      @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<CurrencyRateModel[]> {
    return this.currencyRateService.findAll(skip, take);
  }

  @Query(() => CurrencyRate, { name: 'currencyRate', nullable: true })
  findOne(
    @Args('findUniqueCurrencyRateInput')
      findUniqueCurrencyRateInput: FindUniqueCurrencyRateInput,
  ): Promise<CurrencyRateModel | null> {
    return this.currencyRateService.findOne(findUniqueCurrencyRateInput);
  }

  @Mutation(() => CurrencyRate)
  updateCurrencyRate(
    @Args('updateCurrencyRateInput')
      updateCurrencyRateInput: UpdateCurrencyRateInput,
  ): Promise<CurrencyRateModel | null> {
    return this.currencyRateService.update(updateCurrencyRateInput);
  }

  @Mutation(() => CurrencyRate)
  removeCurrencyRate(
    @Args('findUniqueCurrencyRateInput')
      findUniqueCurrencyRateInput: FindUniqueCurrencyRateInput,
  ): Promise<CurrencyRateModel> {
    return this.currencyRateService.remove(findUniqueCurrencyRateInput);
  }
}
