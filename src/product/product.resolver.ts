import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ProductService } from './product.service';
import { Product } from './models/product.models';
import { GqlJwtAuthGuard } from '../auth/guards/gql-jwt-auth.guard';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { GetProductsDto } from './dto/get-products.dto';
import { FilterProductsInput } from './dto/filter-products.input';
import { SearchResultModel } from './models/search-result.models';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  // @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return this.productService.create(createProductInput);
  }

  @Query(() => GetProductsDto, { name: 'products' })
  findAll(
    @Args('FilterProductsInput') filterProductsInput: FilterProductsInput,
      @Args('take', { type: () => Int, nullable: true }) take?: number,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ): Promise<GetProductsDto> {
    const { search } = filterProductsInput;

    return this.productService.findAll(
      search,
      take,
      skip,
    );
  }

  @Query(() => Product, { name: 'product', nullable: true })
  findOne(
    @Args('id', { type: () => Int }) product_id: number,
  ): Promise<Product | null> {
    return this.productService.findOne(product_id);
  }

  // @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product | null> {
    return this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Product)
  removeProduct(
    @Args('id', { type: () => Int }) product_id: number,
  ): Promise<Product> {
    return this.productService.remove(product_id);
  }

  @Query(() => SearchResultModel, { name: 'searchProducts' })
  searchProducts(
  @Args('take', { type: () => Int }) take: number,
    @Args('skip', { type: () => Int }) skip: number,
    @Args('text', { type: () => String }) text: string,
  ) {
    try {
      return this.productService.search(take, skip, text);
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
