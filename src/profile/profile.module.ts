import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';

@Module({
  imports: [PrismaModule],
  providers: [ProfileResolver, ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
