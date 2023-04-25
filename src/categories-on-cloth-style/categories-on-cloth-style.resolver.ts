import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesOnClothStyleService } from './categories-on-cloth-style.service';
import { CategoriesOnClothStyle } from './models/categories-on-cloth-style.model';
import { CreateCategoriesOnClothStyleInput } from './dto/create-categories-on-cloth-style.input';
import { UpdateCategoriesOnClothStyleInput } from './dto/update-categories-on-cloth-style.input';

@Resolver(() => CategoriesOnClothStyle)
export class CategoriesOnClothStyleResolver {
  constructor(private readonly categoriesOnClothStyleService: CategoriesOnClothStyleService) {}

  @Mutation(() => CategoriesOnClothStyle)
  createCategoriesOnClothStyle(@Args('createCategoriesOnClothStyleInput') createCategoriesOnClothStyleInput: CreateCategoriesOnClothStyleInput) {
    return this.categoriesOnClothStyleService.create(createCategoriesOnClothStyleInput);
  }

  @Query(() => [CategoriesOnClothStyle], { name: 'categoriesOnClothStyle' })
  findAll() {
    return this.categoriesOnClothStyleService.findAll();
  }

  @Query(() => CategoriesOnClothStyle, { name: 'categoriesOnClothStyle' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesOnClothStyleService.findOne(id);
  }

  @Mutation(() => CategoriesOnClothStyle)
  updateCategoriesOnClothStyle(@Args('updateCategoriesOnClothStyleInput') updateCategoriesOnClothStyleInput: UpdateCategoriesOnClothStyleInput) {
    return this.categoriesOnClothStyleService.update(updateCategoriesOnClothStyleInput.id, updateCategoriesOnClothStyleInput);
  }

  @Mutation(() => CategoriesOnClothStyle)
  removeCategoriesOnClothStyle(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesOnClothStyleService.remove(id);
  }
}
