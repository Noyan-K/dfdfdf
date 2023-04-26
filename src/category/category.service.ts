import { Injectable } from '@nestjs/common';
import { ClothSexEnum } from '@prisma/client';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    return this.prisma.category.create({ data: createCategoryInput });
  }

  findAll(sex: ClothSexEnum, search?: string, parent_id?: number): Promise<Category[]> {
    const sexFilter = {
      MALE: { not: ClothSexEnum.FEMALE },
      FEMALE: { not: ClothSexEnum.MALE },
      UNISEX: { equals: ClothSexEnum.UNISEX },
    };
    if (search) {
      return this.prisma.category.findMany({
        where: {
          name: { contains: search, mode: 'insensitive' },
          sex: sexFilter[sex],
        },
        include: {
          Children: true,
          Parent: {
            include: {
              Parent: {
                include: {
                  Parent: true,
                },
              },
            },
          },
        },
      });
    }
    return this.prisma.category.findMany({
      where: {
        parent_id: { equals: parent_id ?? null },
        sex: sexFilter[sex],
      },
      include: {
        Parent: true,
        Children: {
          include: {
            Children: {
              include: {
                Children: true,
              },
            },
          },
        },
      },
    });
  }

  findOne(id: number): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: { id },
      include: {
        Parent: {
          include: {
            Parent: {
              include: {
                Parent: true,
              },
            },
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<Category | null> {
    await this.prisma.category.update({
      where: { id },
      data: updateCategoryInput,
    });
    return this.findOne(id);
  }

  remove(id: number): Promise<Category> {
    return this.prisma.category.delete({ where: { id } });
  }
}
