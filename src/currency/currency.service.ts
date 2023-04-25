import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCurrencyInput } from './dto/create-currency.input';
import { UpdateCurrencyInput } from './dto/update-currency.input';
import { Currency } from './models/currency.model';

@Injectable()
export class CurrencyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCurrencyInput: CreateCurrencyInput): Promise<Currency> {
    return this.prisma.currency.create({ data: createCurrencyInput });
  }

  async findAll(take?: number, skip?: number): Promise<Currency[]> {
    return this.prisma.currency.findMany({ take, skip });
  }

  async findOne(id: number): Promise<Currency> {
    const receivedCurrency: Currency | null = await this.prisma.currency.findUnique({
      where: { id },
    });

    if (!receivedCurrency) {
      throw new NotFoundException();
    }

    return receivedCurrency;
  }

  async update(
    id: number,
    updateCurrencyInput: UpdateCurrencyInput,
  ): Promise<Currency | null> {
    await this.prisma.currency.update({
      data: updateCurrencyInput,
      where: { id },
    });

    return this.prisma.currency.findFirst({ where: { id } });
  }

  async remove(id: number): Promise<Currency> {
    return this.prisma.currency.delete({ where: { id } });
  }
}
