import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { LanguageService } from './language.service';
import { Language } from './models/language.model';
import { CreateLanguageInput } from './dto/create-language.input';
import { UpdateLanguageInput } from './dto/update-language.input';
import { LanguageModel } from './models/language';

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private readonly languageService: LanguageService) {}

  @Mutation(() => Language)
  createLanguage(
    @Args('createLanguageInput') createLanguageInput: CreateLanguageInput,
  ): Promise<LanguageModel> {
    return this.languageService.create(createLanguageInput);
  }

  @Query(() => [Language], { name: 'languages' })
  findAll(
    @Args('skip', { type: () => Int, nullable: true }) skip?: number,
      @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<LanguageModel[]> {
    return this.languageService.findAll(skip, take);
  }

  @Query(() => Language, { name: 'language', nullable: true })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<LanguageModel | null> {
    return this.languageService.findOne(id);
  }

  @Mutation(() => Language)
  updateLanguage(
    @Args('updateLanguageInput') updateLanguageInput: UpdateLanguageInput,
  ): Promise<LanguageModel | null> {
    return this.languageService.update(updateLanguageInput);
  }

  @Mutation(() => Language)
  removeLanguage(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<LanguageModel> {
    return this.languageService.remove(id);
  }
}
