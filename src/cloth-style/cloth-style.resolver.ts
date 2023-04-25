import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { ClothStyleService } from './cloth-style.service';
import { ClothStyle } from './models/cloth-style.model';
import { CreateClothStyleInput } from './dto/create-cloth-style.input';
import { UpdateClothStyleInput } from './dto/update-cloth-style.input';

@Resolver(() => ClothStyle)
export class ClothStyleResolver {
  constructor(private readonly clothStyleService: ClothStyleService) {}

  @Mutation(() => ClothStyle)
  createClothStyle(@Args('createClothStyleInput') createClothStyleInput: CreateClothStyleInput): Promise<ClothStyle> {
    return this.clothStyleService.create(createClothStyleInput);
  }

  @Query(() => [ClothStyle], { name: 'clothStyle' })
  findAll(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ): Promise<ClothStyle[]> {
    return this.clothStyleService.findAll(take, skip);
  }

  @Query(() => ClothStyle, { name: 'clothStyle' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<ClothStyle | null> {
    return this.clothStyleService.findOne(id);
  }

  @Mutation(() => ClothStyle)
  updateClothStyle(
    @Args('id', { type: () => Int }) id: number,
      @Args('updateClothStyleInput') updateClothStyleInput: UpdateClothStyleInput,
  ): Promise<ClothStyle | null> {
    return this.clothStyleService.update(id, updateClothStyleInput);
  }

  @Mutation(() => ClothStyle)
  removeClothStyle(@Args('id', { type: () => Int }) id: number): Promise<ClothStyle> {
    return this.clothStyleService.remove(id);
  }
}
