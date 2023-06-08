import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { ClothSexEnum, MannequinSexEnum } from '@prisma/client';

import { ProductService } from './product.service';
import { Product } from './models/product.model';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll(
    @Args('sex', { type: () => ClothSexEnum }) sex: ClothSexEnum,
    @Args('parent_id', { type: () => Int, nullable: true }) parent_id?: number,
  ): Promise<Product[]> {
    return this.productService.findAll(sex, parent_id);
  }

  @Query(() => [Product], { name: 'searchProducts' })
  search(
    @Args('sex', { type: () => ClothSexEnum }) sex: ClothSexEnum,
    @Args('search', { type: () => String }) search?: string,
  ): Promise<Product[]> {
    return this.productService.search(sex, search);
  }

  @Query(() => Product, { name: 'product', nullable: true })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @Args('mannequinSex', { type: () => MannequinSexEnum })
    mannequinSex?: MannequinSexEnum,
  ): Promise<Product | null> {
    return this.productService.findOne(id, mannequinSex);
  }

  @Mutation(() => Product, { nullable: true })
  updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product | null> {
    return this.productService.update(id, updateProductInput);
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productService.remove(id);
  }
}
