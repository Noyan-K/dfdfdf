import { InputType, PartialType } from '@nestjs/graphql';
import { CreateFabricInput } from './create-fabric.input';

@InputType()
export class UpdateFabricInput extends PartialType(CreateFabricInput) {}
