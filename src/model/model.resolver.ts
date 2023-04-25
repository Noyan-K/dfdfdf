import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ModelService } from './model.service';
import { Model } from './models/model.models';
import { CreateModelInput } from './dto/create-model.input';
import { UpdateModelInput } from './dto/update-model.input';

@Resolver(() => Model)
export class ModelResolver {
  constructor(private readonly modelService: ModelService) {}

  @Mutation(() => Model)
  createModel(
    @Args('createModelInput') createModelInput: CreateModelInput,
  ): Promise<Model> {
    return this.modelService.create(createModelInput);
  }

  @Query(() => [Model], { name: 'models' })
  findAll(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
      @Args('sortOrder', { type: () => Prisma.SortOrder, nullable: true }) sortOrder?: Prisma.SortOrder,
      @Args('sortOrder', { type: () => Prisma.QueryMode, nullable: true }) queryMode?: Prisma.QueryMode,
  ): Promise<Model[]> {
    return this.modelService.findAll(take, skip, sortOrder);
  }

  @Query(() => Model, { name: 'model', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Model | null> {
    return this.modelService.findOne(id);
  }

  @Mutation(() => Model)
  updateModel(
    @Args('updateModelInput') updateModelInput: UpdateModelInput,
  ): Promise<Model | null> {
    return this.modelService.update(updateModelInput);
  }

  @Mutation(() => Model)
  removeModel(@Args('id', { type: () => Int }) id: number): Promise<Model> {
    return this.modelService.remove(id);
  }
}
