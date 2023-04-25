import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { NodeProcessingService } from './node-processing.service';
import { NodeProcessing } from './models/node-processing.model';
import { CreateNodeProcessingInput } from './dto/create-node-processing.input';
import { UpdateNodeProcessingInput } from './dto/update-node-processing.input';

@Resolver(() => NodeProcessing)
export class NodeProcessingResolver {
  constructor(private readonly nodeProcessingService: NodeProcessingService) {}

  @Mutation(() => NodeProcessing)
  createNodeProcessing(@Args('createNodeProcessingInput') createNodeProcessingInput: CreateNodeProcessingInput): Promise<NodeProcessing> {
    return this.nodeProcessingService.create(createNodeProcessingInput);
  }

  @Query(() => [NodeProcessing], { name: 'nodeProcessings', nullable: true })
  findAll(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ): Promise<NodeProcessing[]> {
    return this.nodeProcessingService.findAll(skip, take);
  }

  @Query(() => NodeProcessing, { name: 'nodeProcessing', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<NodeProcessing | null> {
    return this.nodeProcessingService.findOne(id);
  }

  @Mutation(() => NodeProcessing)
  updateNodeProcessing(
    @Args('id', { type: () => Int }) id: number,
      @Args('updateNodeProcessingInput') updateNodeProcessingInput: UpdateNodeProcessingInput,
  ): Promise<NodeProcessing | null> {
    return this.nodeProcessingService.update(id, updateNodeProcessingInput);
  }

  @Mutation(() => NodeProcessing)
  removeNodeProcessing(@Args('id', { type: () => Int }) id: number): Promise<NodeProcessing> {
    return this.nodeProcessingService.remove(id);
  }
}
