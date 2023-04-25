import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { SizeService } from './size.service';
import { Size } from './models/size.model';
import { CreateSizeInput } from './dto/create-size.input';
import { UpdateSizeInput } from './dto/update-size.input';

@Resolver(() => Size)
export class SizeResolver {
  constructor(private readonly sizeService: SizeService) {}

  @Mutation(() => Size)
  createSize(@Args('createSizeInput') createSizeInput: CreateSizeInput): Promise<Size> {
    return this.sizeService.create(createSizeInput);
  }

  @Query(() => [Size], { name: 'size' })
  findAll(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ): Promise<Size[]> {
    return this.sizeService.findAll(take, skip);
  }

  @Query(() => Size, { name: 'size' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Size | null> {
    return this.sizeService.findOne(id);
  }

  @Mutation(() => Size)
  updateSize(
    @Args('id', { type: () => Int }) id: number,
      @Args('updateSizeInput') updateSizeInput: UpdateSizeInput,
  ): Promise<Size | null> {
    return this.sizeService.update(id, updateSizeInput);
  }

  @Mutation(() => Size)
  removeSize(@Args('id', { type: () => Int }) id: number): Promise<Size> {
    return this.sizeService.remove(id);
  }
}
