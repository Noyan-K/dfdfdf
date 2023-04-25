import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateSupplierProductPriceInput } from './dto/create-supplier-product-price.input';
import { UpdateSupplierProductPriceInput } from './dto/update-supplier-product-price.input';
import { PrismaService } from '../prisma/prisma.service';
import { SupplierProductPrice } from './models/supplier-product-price.models';

@Injectable()
export class SupplierProductPriceService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    createSupplierProductPriceInput: CreateSupplierProductPriceInput,
  ): Promise<SupplierProductPrice> {
    return this.prisma.supplierProductPrice.create({
      data: createSupplierProductPriceInput,
    });
  }

  findAll(take?: number, skip?: number): Promise<SupplierProductPrice[]> {
    return this.prisma.supplierProductPrice.findMany({
      take,
      skip,
    });
  }

  async findOne(
    product_id: number,
    supplier_id: number,
    price_date: Date,
  ): Promise<SupplierProductPrice | null> {
    const receivedSupplierProductPrice: SupplierProductPrice | null = await this.prisma.supplierProductPrice.findFirst({
      where: {
        product_id,
        supplier_id,
        price_date,
      },
    });

    if (!receivedSupplierProductPrice) throw new NotFoundException();

    return receivedSupplierProductPrice;
  }

  async update(
    product_id: number,
    supplier_id: number,
    price_date: Date,
    updateSupplierProductPriceInput: UpdateSupplierProductPriceInput,
  ): Promise<SupplierProductPrice | null> {
    await this.prisma.supplierProductPrice.updateMany({
      where: {
        product_id,
        supplier_id,
        price_date,
      },
      data: updateSupplierProductPriceInput,
    });

    return this.prisma.supplierProductPrice.findFirst({
      where: {
        product_id,
        supplier_id,
        price_date,
      },
    });
  }

  remove(
    product_id: number,
    supplier_id: number,
    price_date: Date,
  ): Promise<SupplierProductPrice> {
    return this.prisma.supplierProductPrice.delete({
      where: {
        product_id_supplier_id_price_date: {
          product_id,
          supplier_id,
          price_date,
        },
      },
    });
  }
}
