import { InputType, PartialType } from '@nestjs/graphql';
import { CreateClothStyleInput } from './create-cloth-style.input';

@InputType()
export class UpdateClothStyleInput extends PartialType(CreateClothStyleInput) {}
