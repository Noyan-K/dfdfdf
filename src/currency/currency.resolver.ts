import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { CurrencyService } from './currency.service';
import { Currency } from './models/currency.model';
import { CreateCurrencyInput } from './dto/create-currency.input';
import { UpdateCurrencyInput } from './dto/update-currency.input';

@Resolver(() => Currency)
export class CurrencyResolver {
  constructor(private readonly currencyService: CurrencyService) {}

  @Mutation(() => Currency)
  async createCurrency(
    @Args('createCurrencyInput') createCurrencyInput: CreateCurrencyInput,
  ): Promise<Currency> {
    return this.currencyService.create(createCurrencyInput);
  }

  @Query(() => [Currency], { name: 'currencies' })
  async findAll(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ): Promise<Currency[]> {
    return this.currencyService.findAll(take, skip);
  }

  @Query(() => Currency, { name: 'currency', nullable: true })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Currency> {
    return this.currencyService.findOne(id);
  }

  @Mutation(() => Currency)
  async updateCurrency(
    @Args('updateCurrencyInput') updateCurrencyInput: UpdateCurrencyInput,
  ): Promise<Currency | null> {
    return this.currencyService.update(
      updateCurrencyInput.id,
      updateCurrencyInput,
    );
  }

  @Mutation(() => Currency)
  async removeCurrency(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Currency> {
    return this.currencyService.remove(id);
  }
}
