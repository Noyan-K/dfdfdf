import {
  InputType, Field, Int, PartialType,
} from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CreateProfileInput } from './create-profile.input';

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) {
  @IsNumber()
  @Field(() => Int)
    id: number;
}
