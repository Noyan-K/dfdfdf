import {
  Field, InputType, Int, PartialType,
} from '@nestjs/graphql';
import { CreateDescriptionInput } from './create-description.input';

@InputType()
export class UpdateDescriptionInput extends PartialType(
  CreateDescriptionInput,
) {
  @Field(() => Int)
    id: number;
}
