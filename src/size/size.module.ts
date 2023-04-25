import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import { SizeService } from './size.service';
import { SizeResolver } from './size.resolver';

@Module({
  providers: [SizeResolver, SizeService],
  imports: [PrismaModule],
})
export class SizeModule {}
