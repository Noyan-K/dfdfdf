import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import { AddressService } from './address.service';
import { AddressResolver } from './address.resolver';

@Module({
  providers: [AddressResolver, AddressService],
  imports: [PrismaModule],
})
export class AddressModule {}
