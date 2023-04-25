import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentResolver } from './document.resolver';
import PrismaModule from '../prisma/prisma.module';
import { DocumentController } from './document.controller';

@Module({
  imports: [PrismaModule],
  providers: [DocumentResolver, DocumentService],
  controllers: [DocumentController],
  exports: [DocumentService],
})
export class DocumentModule {}
