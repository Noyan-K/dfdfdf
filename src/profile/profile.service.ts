import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile } from './models/profile.model';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProfileInput: CreateProfileInput): Promise<Profile> {
    return this.prismaService.profile.upsert({
      where: {
        user_id: createProfileInput.user_id,
      },
      update: { deleted_at: null },
      create: createProfileInput,
    });
  }

  findAll(skip?: number, take?: number): Promise<Profile[]> {
    return this.prismaService.profile.findMany({ skip, take });
  }

  findOne(id: number): Promise<Profile | null> {
    return this.prismaService.profile.findFirst({ where: { id } });
  }

  async update(
    id: number,
    updateProfileInput: UpdateProfileInput,
  ): Promise<Profile | null> {
    await this.prismaService.profile.updateMany({
      where: { id },
      data: updateProfileInput,
    });

    return this.prismaService.profile.findFirst({ where: { id } });
  }

  delete(id: number): Promise<Profile> {
    return this.prismaService.profile.delete({ where: { id } });
  }
}
