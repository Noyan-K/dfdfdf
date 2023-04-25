import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import { CurrencyService } from './currency.service';
import { CurrencyResolver } from './currency.resolver';

@Module({
  imports: [PrismaModule],
  providers: [CurrencyResolver, CurrencyService],
})
export class CurrencyModule {}
