import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import { DescriptionService } from './description.service';
// import { DescriptionResolver } from './description.resolver';

@Module({
  imports: [PrismaModule],
  providers: [
    // DescriptionResolver,
    DescriptionService,
  ],
})
export class DescriptionModule {}
