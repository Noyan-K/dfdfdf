import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCurrencyRateInput } from './dto/create-currency-rate.input';
import { FindUniqueCurrencyRateInput } from './dto/find-unique-currency-rate.input';
import { UpdateCurrencyRateInput } from './dto/update-currency-rate.input';
import { CurrencyRateModel } from './models/currency-rate';

@Injectable()
export class CurrencyRateService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    createCurrencyRateInput: CreateCurrencyRateInput,
  ): Promise<CurrencyRateModel> {
    return this.prismaService.currencyRate.create({
      data: createCurrencyRateInput,
    });
  }

  findAll(skip?: number, take?: number): Promise<CurrencyRateModel[]> {
    return this.prismaService.currencyRate.findMany({ skip, take });
  }

  findOne(
    findUniqueCurrencyRateInput: FindUniqueCurrencyRateInput,
  ): Promise<CurrencyRateModel | null> {
    return this.prismaService.currencyRate.findFirst({
      where: {
        currency_id: findUniqueCurrencyRateInput.currency_id,
        date: findUniqueCurrencyRateInput.date,
      },
    });
  }

  async update(
    updateCurrencyRateInput: UpdateCurrencyRateInput,
  ): Promise<CurrencyRateModel | null> {
    await this.prismaService.currencyRate.updateMany({
      where: {
        currency_id: updateCurrencyRateInput.currency_id,
        date: updateCurrencyRateInput.date,
      },
      data: updateCurrencyRateInput,
    });

    return this.prismaService.currencyRate.findFirst({
      where: {
        currency_id: updateCurrencyRateInput.currency_id,
        date: updateCurrencyRateInput.date,
      },
    });
  }

  remove(
    findUniqueCurrencyRateInput: FindUniqueCurrencyRateInput,
  ): Promise<CurrencyRateModel> {
    return this.prismaService.currencyRate.delete({
      where: {
        currency_id_date: {
          currency_id: findUniqueCurrencyRateInput.currency_id,
          date: findUniqueCurrencyRateInput.date,
        },
      },
    });
  }
}
