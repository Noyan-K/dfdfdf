import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';

@Module({
  imports: [PrismaModule],
  providers: [RolesResolver, RolesService],
  exports: [RolesService],
})
export class RolesModule {}
