import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSizeInput } from './create-size.input';

@InputType()
export class UpdateSizeInput extends PartialType(CreateSizeInput) {}
