import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClothStyleInput } from './dto/create-cloth-style.input';
import { UpdateClothStyleInput } from './dto/update-cloth-style.input';
import { ClothStyle } from './models/cloth-style.model';

@Injectable()
export class ClothStyleService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createClothStyleInput: CreateClothStyleInput): Promise<ClothStyle> {
    return this.prismaService.clothStyle.create({ data: createClothStyleInput });
  }

  findAll(
    take?: number,
    skip?: number,
  ): Promise<ClothStyle[]> {
    return this.prismaService.clothStyle.findMany({ take, skip });
  }

  findOne(id: number): Promise<ClothStyle | null> {
    return this.prismaService.clothStyle.findFirst({ where: { id } });
  }

  async update(id: number, updateClothStyleInput: UpdateClothStyleInput): Promise<ClothStyle | null> {
    await this.prismaService.clothStyle.updateMany({ where: { id }, data: updateClothStyleInput });

    return this.prismaService.clothStyle.findFirst({ where: { id } });
  }

  remove(id: number): Promise<ClothStyle> {
    return this.prismaService.clothStyle.delete({ where: { id } });
  }
}
