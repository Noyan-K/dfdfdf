import { Injectable } from '@nestjs/common';

import {
  ClothSexEnum,
  DocumentTypeOfProductEnum,
  MannequinSexEnum,
} from '@prisma/client';

import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './models/product.model';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  sexFilter = {
    MALE: { not: ClothSexEnum.FEMALE },
    FEMALE: { not: ClothSexEnum.MALE },
    UNISEX: { equals: ClothSexEnum.UNISEX },
  };

  constructor(private readonly prisma: PrismaService) {}

  create(createProductInput: CreateProductInput): Promise<Product> {
    return this.prisma.product.create({
      data: {
        ...createProductInput,
        ProductDocument: {
          createMany: {
            data: [
              {
                mannequin_sex: createProductInput.mannequin_sex,
                type: 'PREVIEW',
                document_id: createProductInput.preview_document_id,
              },
              {
                mannequin_sex: createProductInput.mannequin_sex,
                type: 'MANNEQUIN',
                document_id: createProductInput.mannequin_document_id,
              },
            ],
          },
        },
      },
    });
  }

  findAll(sex: ClothSexEnum, parent_id?: number): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        parent_id: { equals: parent_id ?? null },
        sex: this.sexFilter[sex],
      },
      include: {
        ProductDocument: {
          where: {
            type: DocumentTypeOfProductEnum.PREVIEW,
            mannequin_sex:
              sex === 'FEMALE'
                ? MannequinSexEnum.FEMALE
                : MannequinSexEnum.MALE,
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

  search(sex: ClothSexEnum, search?: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        name: { contains: search, mode: 'insensitive' },
        sex: this.sexFilter[sex],
      },
      include: {
        ProductDocument: {
          where: {
            type: DocumentTypeOfProductEnum.PREVIEW,
            mannequin_sex:
              sex === 'FEMALE'
                ? MannequinSexEnum.FEMALE
                : MannequinSexEnum.MALE,
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

  findOne(
    id: number,
    mannequin_sex?: MannequinSexEnum,
  ): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: { id },
      include: {
        ProductDocument: {
          where: {
            type: DocumentTypeOfProductEnum.MANNEQUIN,
            mannequin_sex,
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
    updateProductInput: UpdateProductInput,
  ): Promise<Product | null> {
    await this.prisma.product.update({
      where: { id },
      data: updateProductInput,
    });
    return this.findOne(id);
  }

  remove(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }
}
