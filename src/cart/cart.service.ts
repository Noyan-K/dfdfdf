import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cart } from './models/cart.model';
import { DocumentService } from '../document/document.service';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';

@Injectable()
export class CartService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly documentService: DocumentService,
  ) {}

  async create(createCartInput: CreateCartInput): Promise<Cart> {
    return this.prismaService.cart.create({ data: createCartInput });
  }

  findAll(contact_id: number, take?: number, skip?: number): Promise<Cart[]> {
    return this.prismaService.cart.findMany({
      where: { contact_id },
      take,
      skip,
    });
  }

  findOne(id: number): Promise<Cart | null> {
    return this.prismaService.cart.findFirst({
      where: { id },
      include: {
        CartSize: {
          include: {
            Size: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    updateCartInput: UpdateCartInput,
  ): Promise<Cart | null> {
    await this.prismaService.cart.update({
      where: { id },
      data: updateCartInput,
    });
    return this.findOne(id);
  }

  remove(id: number): Promise<Cart> {
    return this.prismaService.cart.delete({ where: { id } });
  }
}
