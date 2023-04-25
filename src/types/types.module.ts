import { Module } from '@nestjs/common';
import PrismaModule from '../prisma/prisma.module';
import { Types } from './index';

@Module({
  imports: [PrismaModule],
  providers: [Types],
})
export class TypeModule {}
