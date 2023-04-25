import { InputType, PartialType } from '@nestjs/graphql';
import { CreateContactInput } from './create-contact.input';

@InputType()
export class UpdateContactInput extends PartialType(CreateContactInput) {}
