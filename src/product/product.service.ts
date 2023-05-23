import { Injectable } from '@nestjs/common';
import { ClothSexEnum, DocumentTypeOfProductEnum } from '@prisma/client';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from './models/product.model';
import { DocumentService } from '../document/document.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly documentService: DocumentService,
  ) {}

  sexFilter = {
    MALE: { not: ClothSexEnum.FEMALE },
    FEMALE: { not: ClothSexEnum.MALE },
    UNISEX: { equals: ClothSexEnum.UNISEX },
  };

  create(createProductInput: CreateProductInput): Promise<Product> {
    return this.prisma.product.create({
      data: {
        ...createProductInput,
        ProductDocument: {
          createMany: {
            data: [
              { type: 'PREVIEW', document_id: createProductInput.preview_document_id },
              { type: 'MANNEQUIN', document_id: createProductInput.mannequin_document_id },
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

  findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findFirst({
      where: { id },
      include: {
        ProductDocument: {
          where: {
            type: DocumentTypeOfProductEnum.MANNEQUIN,
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
