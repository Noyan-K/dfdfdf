import {
  InputType, Field, Int, PartialType,
} from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CreateLanguageInput } from './create-language.input';

@InputType()
export class UpdateLanguageInput extends PartialType(CreateLanguageInput) {
  @IsNumber()
  @Field(() => Int)
    id: number;
}
