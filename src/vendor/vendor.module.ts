import { Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorResolver } from './vendor.resolver';
import PrismaModule from '../prisma/prisma.module';
import { DocumentModule } from '../document/document.module';

@Module({
  imports: [PrismaModule, DocumentModule],
  providers: [VendorResolver, VendorService],
})
export class VendorModule {}
