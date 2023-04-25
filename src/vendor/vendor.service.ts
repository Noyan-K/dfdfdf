import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateVendorInput } from './dto/create-vendor.input';
import { UpdateVendorInput } from './dto/update-vendor.input';
import { Vendor } from './models/vendor.models';
import { DocumentService } from '../document/document.service';
import { Document } from '../document/models/document.model';

@Injectable()
export class VendorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly documentService: DocumentService,
  ) {}

  create(createVendorInput: CreateVendorInput): Promise<Vendor> {
    return this.prisma.vendor.upsert({
      where: { name: createVendorInput.name },
      create: createVendorInput,
      update: { deleted_at: null },
    });
  }

  findAll(take?: number, skip?: number, vendor_id?: number): Promise<Vendor[]> {
    return this.prisma.vendor.findMany({
      where: { id: vendor_id },
      orderBy: { name: 'asc' },
      take,
      skip,
    });
  }

  async findOne(id: number): Promise<Vendor | null> {
    const receivedVendor: Vendor | null = await this.prisma.vendor.findFirst({
      where: { id },
    });

    if (!receivedVendor) throw new NotFoundException();

    return receivedVendor;
  }

  async update(
    id: number,
    updateVendorInput: UpdateVendorInput,
  ): Promise<Vendor | null> {
    await this.prisma.vendor.updateMany({
      where: { id },
      data: updateVendorInput,
    });

    return this.prisma.vendor.findFirst({
      where: { id },
    });
  }

  remove(id: number): Promise<Vendor | null> {
    return this.prisma.vendor.delete({
      where: { id },
    });
  }

  async getFilteredVendorsList(): Promise<Vendor[]> {
    const vendors: Vendor[] = await this.prisma.vendor.findMany({
      where: {
        document_id: { not: null },
      },
      orderBy: {
        Product: { _count: 'desc' },
      },
      take: 16,
    });

    const documents = await Promise.all(
      vendors.map((vendor) => {
        if (vendor.document_id) {
          return this.documentService.getDocument(
            vendor.document_id,
          ) as Promise<Document>;
        }
        return undefined;
      }),
    );

    vendors.forEach((vendor, idx) => {
      vendors[idx].Document = documents[idx];
    });

    return vendors;
  }

  getVendorsModelList(vendor_id?: number): Promise<Vendor[]> {
    return this.prisma.vendor.findMany({
      where: {
        id: vendor_id,
      },
      orderBy: { name: 'asc' },
      include: {
        Model: {
          where: { deleted_at: null },
          orderBy: { name: 'asc' },
        },
      },
    });
  }
}
