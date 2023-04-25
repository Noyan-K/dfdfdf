import {
  InputType, Field, Int, PartialType,
} from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CreateModelInput } from './create-model.input';

@InputType()
export class UpdateModelInput extends PartialType(CreateModelInput) {
  @IsNumber()
  @Field(() => Int)
    id: number;
}
