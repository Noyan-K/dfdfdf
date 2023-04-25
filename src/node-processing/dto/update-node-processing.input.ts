import { InputType, PartialType } from '@nestjs/graphql';
import { CreateNodeProcessingInput } from './create-node-processing.input';

@InputType()
export class UpdateNodeProcessingInput extends PartialType(CreateNodeProcessingInput) {}
