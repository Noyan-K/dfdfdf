import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import { LanguageService } from './language.service';
import { LanguageResolver } from './language.resolver';

@Module({
  imports: [PrismaModule],
  providers: [LanguageResolver, LanguageService],
})
export class LanguageModule {}
