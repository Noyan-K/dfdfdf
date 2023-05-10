import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CreateVendorInput } from './dto/create-vendor.input';
import { UpdateVendorInput } from './dto/update-vendor.input';
import { Vendor } from './models/vendor.models';
import { DocumentService } from '../document/document.service';

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
      include: { Document: true },
      take,
      skip,
    });
  }

  async findOne(id: number): Promise<Vendor | null> {
    const receivedVendor: Vendor | null = await this.prisma.vendor.findFirst({
      where: { id },
      include: { Document: true },
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
      include: { Document: true },
      take: 16,
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
