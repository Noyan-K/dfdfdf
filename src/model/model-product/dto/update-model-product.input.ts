import { InputType, PartialType } from '@nestjs/graphql';
import { CreateModelProductInput } from './create-model-product.input';

@InputType()
export class UpdateModelProductInput extends PartialType(
  CreateModelProductInput,
) {}
