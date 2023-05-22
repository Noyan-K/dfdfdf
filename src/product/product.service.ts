import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './models/product.models';
import { PrismaService } from '../prisma/prisma.service';
import { GetProductsDto } from './dto/get-products.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  create(createProductInput: CreateProductInput): Promise<Product> {
    const arrayOfProductDocuments: Prisma.ProductDocumentCreateManyProductInput[] = [];

    if (createProductInput.array_of_document_ids && createProductInput.array_of_document_ids.length > 0) {
      createProductInput.array_of_document_ids.forEach((id) => {
        arrayOfProductDocuments.push({
          document_id: id,
        });
      });
    }

    delete createProductInput.array_of_document_ids;

    return this.prisma.product.create({
      data: {
        ...createProductInput,
        ProductDocument: {
          createMany: {
            data: [
              ...arrayOfProductDocuments,
            ],
          },
        },
      },
    });
  }

  async findAll(
    search: string,
    take?: number,
    skip?: number,
  ): Promise<GetProductsDto> {
    const where = {
      name: { contains: search, mode: Prisma.QueryMode.insensitive },
    };

    const total: number = await this.prisma.product.count({ where });

    const products: Product[] = await this.prisma.product.findMany({
      where,
      take,
      skip,
      include: {
        ProductDocument: {
          include: {
            Document: true,
          },
        },
        Description: true,
      },
    });

    return {
      products,
      total,
    };
  }

  findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findFirst(
      {
        where: { id },
        include: {
          ProductDocument: {
            include: {
              Document: true,
            },
          },
          Description: true,
        },
      },
    );
  }

  async update(
    id: number,
    updateProductInput: UpdateProductInput,
  ): Promise<Product | null> {
    if (updateProductInput.array_of_document_ids && updateProductInput.array_of_document_ids.length > 0) {
      const receivedProductDocument = await this.prisma.productDocument.findMany({
        where: { product_id: id },
      });

      const mappedReceivedProductDocument = receivedProductDocument.map((val) => val.document_id);
      const filteredArrayOfDocumentIds = updateProductInput.array_of_document_ids.filter((val) => !mappedReceivedProductDocument.includes(val));

      const createProductDocuments: { product_id: number, document_id: number }[] = filteredArrayOfDocumentIds.map((document_id: number) => {
        const result = { product_id: id, document_id };
        return result;
      });

      await this.prisma.productDocument.createMany({
        data: createProductDocuments,
      });
    }

    delete updateProductInput.array_of_document_ids;

    await this.prisma.product.update({
      data: updateProductInput,
      where: { id },
    });

    return this.prisma.product.findFirst({ where: { id } });
  }

  remove(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }

  async search(take: number, skip: number, text: string) {
    const queryText = `${text.replace(/ /g, ':* | ')}:*`;

    const receivedProducts = await this.prisma.$queryRaw`
      select *
      from "public"."Product"
      where to_tsvector("name") @@ to_tsquery(${queryText}) and "deleted_at" is null
      ORDER BY ts_rank(to_tsvector("name"), to_tsquery(${queryText})) DESC
      LIMIT ${take} OFFSET ${skip};
    `;

    return {
      receivedProducts,
    };
  }
}
