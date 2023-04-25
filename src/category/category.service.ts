import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryModel } from './models/category';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    return this.prisma.category.create({ data: createCategoryInput });
  }

  findAll(search?: string, parent_id?: number): Promise<CategoryModel[]> {
    return this.prisma.category.findMany({
      where: {
        parent_id: { equals: parent_id ?? null },
        name: { search, mode: 'insensitive' },
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
    return this.prisma.category.findFirst({ where: { id } });
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput): Promise<Category | null> {
    await this.prisma.category.update({ where: { id }, data: updateCategoryInput });
    return this.findOne(id);
  }

  remove(id: number): Promise<Category> {
    return this.prisma.category.delete({ where: { id } });
  }
}
