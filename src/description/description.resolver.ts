import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { DescriptionService } from './description.service';
import { CreateDescriptionInput } from './dto/create-description.input';
import { UpdateDescriptionInput } from './dto/update-description.input';
import { Description } from './models/description.model';

@Resolver(() => Description)
export class DescriptionResolver {
  constructor(private readonly descriptionService: DescriptionService) {}

  @Mutation(() => Description)
  async createDescription(
    @Args('createDescriptionInput')
      createDescriptionInput: CreateDescriptionInput,
  ): Promise<Description> {
    return this.descriptionService.create(createDescriptionInput);
  }

  @Query(() => [Description], { name: 'descriptions' })
  async findAll(
    @Args('take', { type: () => Int, nullable: true }) take?: number,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  ): Promise<Description[]> {
    return this.descriptionService.findAll(take, skip);
  }

  @Query(() => Description, { name: 'description', nullable: true })
  async findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Description> {
    return this.descriptionService.findOne(id);
  }

  @Mutation(() => Description)
  async updateDescription(
    @Args('updateDescriptionInput')
      updateDescriptionInput: UpdateDescriptionInput,
  ): Promise<Description | null> {
    return this.descriptionService.update(
      updateDescriptionInput.id,
      updateDescriptionInput,
    );
  }

  @Mutation(() => Description)
  async removeDescription(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Description> {
    return this.descriptionService.remove(id);
  }
}
