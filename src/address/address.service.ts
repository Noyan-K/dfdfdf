import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAddressInput } from './dto/create-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { Address } from './models/address.model';

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user_id: number, createAddressInput: CreateAddressInput): Promise<Address> {
    const name = createAddressInput.name ?? `Адрес доставки №${await this.prismaService.address.count({ where: { user_id } })}`;
    const receivedUser = await this.prismaService.user.findFirst({ where: { id: user_id } });

    return this.prismaService.address.create({
      data: {
        ...createAddressInput,
        name,
        user_id,
        supplier_id: receivedUser?.supplier_id,
      },
    });
  }

  findAll(user_id: number, take?: number, skip?: number, supplier_id?: number): Promise<Address[]> {
    return supplier_id ? this.prismaService.address.findMany({
      where: {
        supplier_id,
        type: 'WAREHOUSE',
      },
      skip,
      take,
    }) : this.prismaService.address.findMany({
      where: {
        user_id,
      },
      skip,
      take,
    });
  }

  async findOne(id: number, user_id: number): Promise<Address | null> {
    const receivedAddress = await this.prismaService.address.findFirst({ where: { id } });

    if (
      (receivedAddress?.type === 'DELIVERY' && receivedAddress?.user_id === user_id)
      || receivedAddress?.type === 'WAREHOUSE'
    ) {
      return receivedAddress;
    }

    throw new NotFoundException();
  }

  async update(id: number, user_id: number, updateAddressInput: UpdateAddressInput): Promise<Address | null> {
    const receivedAddress = await this.prismaService.address.findFirst({
      where: {
        id,
        user_id,
      },
    });

    if (!receivedAddress) {
      throw new NotFoundException();
    }

    await this.prismaService.address.update({
      data: {
        ...updateAddressInput,
      },
      where: {
        id: receivedAddress.id,
      },
    });

    return this.prismaService.address.findFirst({ where: { id } });
  }

  async remove(id: number, user_id: number): Promise<Address | null> {
    const receivedAddress = await this.prismaService.address.findFirst({
      where: {
        id,
        user_id,
      },
    });

    if (!receivedAddress) {
      throw new NotFoundException();
    }

    return this.prismaService.address.delete({
      where: {
        id: receivedAddress.id,
      },
    });
  }
}
