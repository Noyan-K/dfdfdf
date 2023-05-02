import { Injectable } from '@nestjs/common';
import { ClothSexEnum, DocumentTypeOfCategoryEnum } from '@prisma/client';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from './models/category.model';
import { DocumentService } from '../document/document.service';
import {CategoryDocument} from './models/category-document.model';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly documentService: DocumentService,
  ) {}

  sexFilter = {
    MALE: { not: ClothSexEnum.FEMALE },
    FEMALE: { not: ClothSexEnum.MALE },
    UNISEX: { equals: ClothSexEnum.UNISEX },
  };

  create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    return this.prisma.category.create({ data: createCategoryInput });
  }

  async findAll(sex: ClothSexEnum, parent_id?: number): Promise<Category[]> {
    let categories: Category[] = await this.prisma.category.findMany({
      where: {
        parent_id: { equals: parent_id ?? null },
        sex: this.sexFilter[sex],
      },
      include: {
        CategoryDocument: {
          where: {
            type: DocumentTypeOfCategoryEnum.PREVIEW,
          },
        },
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

    categories = await Promise.all(
      categories.map(async (category) => {
        if (category!.CategoryDocument!.length > 0) {
          await Promise.all(category!.CategoryDocument!.map(async (categoryDocument) => {
            categoryDocument.Document = await this.documentService.getDocument(categoryDocument.document_id);
          }));
        } return category;
      }),
    );

    return categories;
  }

  async search(sex: ClothSexEnum, search?: string): Promise<Category[]> {
    let categories: Category[] = await this.prisma.category.findMany({
      where: {
        name: { contains: search, mode: 'insensitive' },
        sex: this.sexFilter[sex],
      },
      include: {
        CategoryDocument: {
          where: {
            type: DocumentTypeOfCategoryEnum.PREVIEW,
          },
        },
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

    categories = await Promise.all(
      categories.map(async (category) => {
        if (category!.CategoryDocument!.length > 0) {
          await Promise.all(category!.CategoryDocument!.map(async (categoryDocument) => {
            categoryDocument.Document = await this.documentService.getDocument(categoryDocument.document_id);
          }));
        } return category;
      }),
    );

    return categories;
  }

  async findOne(id: number): Promise<Category | null> {
    const category: Category | null = await this.prisma.category.findFirst({
      where: { id },
      include: {
        CategoryDocument: {
          where: {
            type: DocumentTypeOfCategoryEnum.MANNEQUIN,
          },
        },
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

    if (category!.CategoryDocument!.length > 0) {
      await Promise.all(category!.CategoryDocument!.map(async (categoryDocument) => {
        categoryDocument.Document = await this.documentService.getDocument(categoryDocument.document_id);
      }));
    }

    return category;
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
