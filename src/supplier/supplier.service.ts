import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';

import { CreateSupplierInput } from './dto/create-supplier.input';
import { UpdateSupplierInput } from './dto/update-supplier.input';
import { Supplier } from './models/supplier.model';
import { FindSuppliersInput } from './dto/find-suppliers.input';
import { SupplierModel } from './models/supplier';

import { SortByEnum } from '../types/sort.type';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SupplierService {
    constructor(private readonly prisma: PrismaService) {}

    create(createSupplierInput: CreateSupplierInput): Promise<Supplier> {
        return this.prisma.supplier.create({
            data: createSupplierInput,
        });
    }

    findAll(
        findSuppliersInput?: FindSuppliersInput,
        take?: number,
        skip?: number,
    ): Promise<SupplierModel[]> {
        return this.prisma.supplier.findMany({
            take,
            skip,
            include: {
                User: true,
            },
            where: {
                User: {
                    name: {
                        startsWith: findSuppliersInput?.search
                            ? findSuppliersInput.search
                            : undefined,
                        mode: 'insensitive',
                    },
                },
            },
            orderBy: {
                User: {
                    name: findSuppliersInput?.sort_by === SortByEnum.NAME ? 'asc' : undefined,
                },
            },
        });
    }

    async findOne(id: number): Promise<Supplier | null> {
        const receivedProduct: Supplier | null = await this.prisma.supplier.findFirst({
            where: { id },
        });

        if (!receivedProduct) {
            throw new NotFoundException();
        }

        return receivedProduct;
    }

    async update(id: number, updateSupplierInput: UpdateSupplierInput): Promise<Supplier | null> {
        await this.prisma.supplier.updateMany({
            where: { id },
            data: {
                ...updateSupplierInput,
            },
        });

        return this.prisma.supplier.findFirst({
            where: { id },
        });
    }

    remove(id: number): Promise<Supplier> {
        return this.prisma.supplier.delete({
            where: { id },
        });
    }
}
