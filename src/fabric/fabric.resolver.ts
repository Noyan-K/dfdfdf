import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { FabricService } from './fabric.service';
import { Fabric } from './models/fabric.model';
import { CreateFabricInput } from './dto/create-fabric.input';
import { UpdateFabricInput } from './dto/update-fabric.input';

@Resolver(() => Fabric)
export class FabricResolver {
  constructor(private readonly fabricService: FabricService) {}

  @Mutation(() => Fabric)
  createFabric(@Args('createFabricInput') createFabricInput: CreateFabricInput): Promise<Fabric> {
    return this.fabricService.create(createFabricInput);
  }

  @Query(() => [Fabric], { name: 'fabric' })
  findAll(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ): Promise<Fabric[]> {
    return this.fabricService.findAll(skip, take);
  }

  @Query(() => Fabric, { name: 'fabric' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Fabric | null> {
    return this.fabricService.findOne(id);
  }

  @Mutation(() => Fabric)
  updateFabric(
    @Args('id', { type: () => Int }) id: number,
      @Args('updateFabricInput') updateFabricInput: UpdateFabricInput,
  ): Promise<Fabric | null> {
    return this.fabricService.update(id, updateFabricInput);
  }

  @Mutation(() => Fabric)
  removeFabric(@Args('id', { type: () => Int }) id: number): Promise<Fabric> {
    return this.fabricService.remove(id);
  }
}
