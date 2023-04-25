import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Prisma } from '@prisma/client';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './models/product.models';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentService } from '../document/document.service';
import { Document } from '../document/models/document.model';
import { GetProductsDto } from './dto/get-products.dto';
import { GetComparedProductsDto } from './dto/get-compared-products.dto';
import { ComparedProduct } from './models/compared-product';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly documentService: DocumentService,
  ) {}

  create(createProductInput: CreateProductInput): Promise<Product> {
    return this.prisma.product.create({
      data: createProductInput,
    });
  }

  async findAll(
    search: string,
    take?: number,
    skip?: number,
    vendor_ids?: number[],
    model_ids?: number[],
  ): Promise<GetProductsDto> {
    if (vendor_ids?.length === 0) vendor_ids = undefined;

    const where = {
      OR: [
        { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { vendor_partnumber: { contains: search, mode: Prisma.QueryMode.insensitive } },
      ],
      vendor_id: { in: vendor_ids },
      SupplierProductPrice: { some: { deleted_at: { equals: null } } },
      ModelProduct: {},
    };

    if (model_ids?.length && model_ids.length > 0) where.ModelProduct = { some: { model_id: { in: model_ids } } };

    const total: number = await this.prisma.product.count({ where });

    const products: Product[] = await this.prisma.product.findMany({
      where,
      take,
      skip,
      include: {
        Vendor: true,
        ModelProduct: {
          include: {
            Model: true,
          },
        },
        Description: true,
        SupplierProductPrice: {
          where: {
            deleted_at: { equals: null }
          },
          orderBy: {
            price: 'asc',
          }
        },
      },
    });

    const documents = await Promise.all(
      products.map(
        (product) => this.documentService.getDocument(product.document_id) as Promise<
        Document[]
        >,
      ),
    );

    products.forEach((product, idx) => {
      products[idx].Document = documents[idx];
    });

    return {
      products,
      total,
    };
  }

  async compareAll(
    search: string,
    supplier_id_with: number,
    supplier_id?: number,
    take?: number,
    skip?: number,
    vendor_ids?: number[],
    model_ids?: number[],
  ): Promise<GetComparedProductsDto> {
    if (vendor_ids?.length === 0) vendor_ids = undefined;

    const where = {
      OR: [
        { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
        { vendor_partnumber: { contains: search, mode: Prisma.QueryMode.insensitive } },
      ],
      AND: [
        { SupplierProductPrice: { some: { deleted_at: { equals: null } } } },
        { SupplierProductPrice: { some: { supplier_id: supplier_id_with, deleted_at: { equals: null } } } },
      ],
      vendor_id: { in: vendor_ids },
      ModelProduct: {},
    };

    if (supplier_id) where.AND.push({SupplierProductPrice: { some: { supplier_id: supplier_id, deleted_at: { equals: null } } }})

    if (model_ids?.length && model_ids.length > 0) where.ModelProduct = { some: { model_id: { in: model_ids } } };

    const total: number = await this.prisma.product.count({ where });

    const products: Product[] = await this.prisma.product.findMany({
      where,
      include: {
        Vendor: true,
        ModelProduct: {
          include: {
            Model: true,
          },
        },
        Description: true,
        SupplierProductPrice: {
          where: {
            deleted_at: { equals: null }
          },
          orderBy: {
            price: 'asc',
          }
        },
      },
    });

    const documents = await Promise.all(
      products.map(
        (product) => this.documentService.getDocument(product.document_id) as Promise<
        Document[]
        >,
      ),
    );

    products.forEach((product, idx) => {
      products[idx].Document = documents[idx];
    });

    let resultProducts: ComparedProduct[] = []

    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      let supplierPrice = supplier_id ? product.SupplierProductPrice?.find(p => p.supplier_id == supplier_id)?.price : product.SupplierProductPrice?.at(0)?.price
      const supplierWithPrice =product.SupplierProductPrice?.find((p) => p.supplier_id == supplier_id_with)?.price
      const difference = supplierPrice && supplierWithPrice ? Math.ceil((100 - ((supplierPrice * 100 / supplierWithPrice))) * 10) / 10 : undefined
      resultProducts.push({ ...product, supplier_price: supplierPrice, supplier_with_price: supplierWithPrice || 0, price_difference: difference || 0 })
    }

    resultProducts = resultProducts.sort((a, b) => b.price_difference - a.price_difference)
    resultProducts = resultProducts.slice(skip, ((take || 0) + (skip || 0)))

    return {
      products: resultProducts,
      total,
    };
  }

  async findOne(id: number): Promise<Product | null> {
    const receivedProduct: Product | null = await this.prisma.product.findFirst(
      {
        where: { id },
        include: {
          Vendor: true,
          ModelProduct: {
            include: {
              Model: true,
            },
          },
          Description: {
            include: {
              Language: true,
            },
          },
          SupplierProductPrice: {
            where: {
              deleted_at: null,
            },
            orderBy: {
              price: 'asc',
            },
            include: {
              Currency: true,
              Supplier: {
                include: {
                  User: true,
                },
              },
            },
          },
        },
      },
    );

    if (!receivedProduct) throw new NotFoundException();

    receivedProduct.Document = (await this.documentService.getDocument(
      receivedProduct.document_id,
    )) as Document[];

    return receivedProduct;
  }

  async update(
    id: number,
    updateProductInput: UpdateProductInput,
  ): Promise<Product | null> {
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

    const receivedModels = await this.prisma.$queryRaw`
      select *
      from "public"."Model"
      where to_tsvector("name") @@ to_tsquery(${queryText}) and "deleted_at" is null
      ORDER BY ts_rank(to_tsvector("name"), to_tsquery(${queryText})) DESC
      LIMIT ${take} OFFSET ${skip};
    `;

    const receivedVendors = await this.prisma.$queryRaw`
      select *
      from "public"."Vendor"
      where to_tsvector("name") @@ to_tsquery(${queryText}) and "deleted_at" is null
      ORDER BY ts_rank(to_tsvector("name"), to_tsquery(${queryText})) DESC
      LIMIT ${take} OFFSET ${skip};
    `;

    return {
      receivedProducts,
      receivedModels,
      receivedVendors,
    };
  }
}
