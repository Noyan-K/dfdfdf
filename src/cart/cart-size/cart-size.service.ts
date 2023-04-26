import { Injectable } from '@nestjs/common';
import { CreateCartSizeInput } from './dto/create-cart-size.input';
import { UpdateCartSizeInput } from './dto/update-cart-size.input';
import { PrismaService } from '../../prisma/prisma.service';
import { CartSize } from './models/cart-size.model';

@Injectable()
export class CartSizeService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  create(createCartSizeInput: CreateCartSizeInput): Promise<CartSize> {
    return this.prisma.cartSize.create({ data: createCartSizeInput });
  }

  // async createMany(createCartSizeArrayInput: CreateCartSizeInput[]): Promise<CartSize[]> {
  //   const promises: Promise<CartSize> = [];
  //   createCartSizeArrayInput.map((el) => promises.push(this.create(el)));
  //   const cartSizes = await Promise.all(promises);
  //   return cartSizes;
  // }

  findAll() {
    return `This action returns all cartSize`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cartSize`;
  }

  update(id: number, updateCartSizeInput: UpdateCartSizeInput) {
    return `This action updates a #${id} cartSize`;
  }

  remove(id: number) {
    return `This action removes a #${id} cartSize`;
  }
}
