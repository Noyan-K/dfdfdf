import { Injectable } from '@nestjs/common';
import { ClothSexEnum, DocumentTypeOfCategoryEnum } from '@prisma/client';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from '../prisma/prisma.service';
import { Category } from './models/category.model';
import { DocumentService } from '../document/document.service';

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
    return this.prisma.category.create({
      data: {
        ...createCategoryInput,
        CategoryDocument: {
          createMany: {
            data: [
              { type: 'PREVIEW', document_id: createCategoryInput.preview_document_id },
              { type: 'MANNEQUIN', document_id: createCategoryInput.mannequin_document_id },
            ],
          },
        },
      },
    });
  }

  findAll(sex: ClothSexEnum, parent_id?: number): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: {
        parent_id: { equals: parent_id ?? null },
        sex: this.sexFilter[sex],
      },
      include: {
        CategoryDocument: {
          where: {
            type: DocumentTypeOfCategoryEnum.PREVIEW,
          },
          include: {
            Document: true,
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
  }

  search(sex: ClothSexEnum, search?: string): Promise<Category[]> {
    return this.prisma.category.findMany({
      where: {
        name: { contains: search, mode: 'insensitive' },
        sex: this.sexFilter[sex],
      },
      include: {
        CategoryDocument: {
          where: {
            type: DocumentTypeOfCategoryEnum.PREVIEW,
          },
          include: {
            Document: true,
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
  }

  findOne(id: number): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: { id },
      include: {
        CategoryDocument: {
          where: {
            type: DocumentTypeOfCategoryEnum.MANNEQUIN,
          },
          include: {
            Document: true,
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
