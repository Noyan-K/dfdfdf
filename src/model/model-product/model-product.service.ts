import { Injectable } from '@nestjs/common';
import { CreateModelProductInput } from './dto/create-model-product.input';
import { PrismaService } from '../../prisma/prisma.service';
import { ModelProduct } from './models/model-product.model';

@Injectable()
export class ModelProductService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    createModelProductInput: CreateModelProductInput,
  ): Promise<ModelProduct> {
    return this.prismaService.modelProduct.upsert({
      where: {
        product_id_model_id: {
          model_id: createModelProductInput.model_id,
          product_id: createModelProductInput.product_id,
        },
      },
      create: createModelProductInput,
      update: {
        deleted_at: null,
      },
    });
  }

  findAll(take?: number, skip?: number): Promise<ModelProduct[]> {
    return this.prismaService.modelProduct.findMany({
      take,
      skip,
    });
  }

  findOne(product_id: number, model_id: number): Promise<ModelProduct | null> {
    return this.prismaService.modelProduct.findFirst({
      where: {
        product_id,
        model_id,
      },
    });
  }

  async update(
    product_id: number,
    model_id: number,
  ): Promise<ModelProduct | null> {
    const modelProduct = await this.prismaService.modelProduct.update({
      where: {
        product_id_model_id: {
          model_id,
          product_id,
        },
      },
      data: {
        model_id,
        product_id,
      },
    });

    return this.prismaService.modelProduct.findFirst({
      where: {
        product_id: modelProduct.product_id,
        model_id: modelProduct.model_id,
      },
    });
  }

  remove(product_id: number, model_id: number): Promise<ModelProduct> {
    return this.prismaService.modelProduct.delete({
      where: {
        product_id_model_id: {
          model_id,
          product_id,
        },
      },
    });
  }
}
