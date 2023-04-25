import { Module } from '@nestjs/common';
import { CategoriesOnClothStyleService } from './categories-on-cloth-style.service';
import { CategoriesOnClothStyleResolver } from './categories-on-cloth-style.resolver';

@Module({
  providers: [CategoriesOnClothStyleResolver, CategoriesOnClothStyleService]
})
export class CategoriesOnClothStyleModule {}
