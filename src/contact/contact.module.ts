import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import { ContactService } from './contact.service';
import { ContactResolver } from './contact.resolver';

@Module({
  providers: [ContactResolver, ContactService],
  imports: [PrismaModule],
})
export class ContactModule {}
