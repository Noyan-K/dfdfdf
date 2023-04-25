import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { ModelProductService } from './model-product.service';
import { ModelProduct } from './models/model-product.model';
import { CreateModelProductInput } from './dto/create-model-product.input';
import { UpdateModelProductInput } from './dto/update-model-product.input';

@Resolver(() => ModelProduct)
export class ModelProductResolver {
  constructor(private readonly modelProductService: ModelProductService) {}

  @Mutation(() => ModelProduct)
  createModelProduct(
    @Args('createModelProductInput')
      createModelProductInput: CreateModelProductInput,
  ): Promise<ModelProduct> {
    return this.modelProductService.create(createModelProductInput);
  }

  @Query(() => [ModelProduct], { name: 'modelProduct' })
  findAll(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ): Promise<ModelProduct[]> {
    return this.modelProductService.findAll(take, skip);
  }

  @Query(() => ModelProduct, { name: 'modelProduct' })
  findOne(
    @Args('product_id', { type: () => Int }) product_id: number,
      @Args('model_id', { type: () => Int }) model_id: number,
  ): Promise<ModelProduct | null> {
    return this.modelProductService.findOne(product_id, model_id);
  }

  @Mutation(() => ModelProduct)
  updateModelProduct(
    @Args('product_id', { type: () => Int }) product_id: number,
      @Args('model_id', { type: () => Int }) model_id: number,
  ): Promise<ModelProduct | null> {
    return this.modelProductService.update(product_id, model_id);
  }

  @Mutation(() => ModelProduct)
  removeModelProduct(
    @Args('product_id', { type: () => Int }) product_id: number,
      @Args('model_id', { type: () => Int }) model_id: number,
  ): Promise<ModelProduct> {
    return this.modelProductService.remove(product_id, model_id);
  }
}
