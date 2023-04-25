import { Module } from '@nestjs/common';
import PrismaModule from '../prisma/prisma.module';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { DocumentModule } from '../document/document.module';

@Module({
  imports: [PrismaModule, DocumentModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
