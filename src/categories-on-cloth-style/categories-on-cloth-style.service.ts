import { Injectable } from '@nestjs/common';
import { CreateCategoriesOnClothStyleInput } from './dto/create-categories-on-cloth-style.input';
import { UpdateCategoriesOnClothStyleInput } from './dto/update-categories-on-cloth-style.input';

@Injectable()
export class CategoriesOnClothStyleService {
  create(createCategoriesOnClothStyleInput: CreateCategoriesOnClothStyleInput) {
    return 'This action adds a new categoriesOnClothStyle';
  }

  findAll() {
    return `This action returns all categoriesOnClothStyle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} categoriesOnClothStyle`;
  }

  update(id: number, updateCategoriesOnClothStyleInput: UpdateCategoriesOnClothStyleInput) {
    return `This action updates a #${id} categoriesOnClothStyle`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoriesOnClothStyle`;
  }
}
