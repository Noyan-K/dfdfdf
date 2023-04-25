import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import { CurrencyRateService } from './currency-rate.service';
import { CurrencyRateResolver } from './currency-rate.resolver';

@Module({
  imports: [PrismaModule],
  providers: [CurrencyRateResolver, CurrencyRateService],
})
export class CurrencyRateModule {}
