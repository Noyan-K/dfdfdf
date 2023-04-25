import {
  Resolver, Query, Mutation, Args, Int,
} from '@nestjs/graphql';
import { ContactService } from './contact.service';
import { Contact } from './models/contact.model';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';

@Resolver(() => Contact)
export class ContactResolver {
  constructor(private readonly contactService: ContactService) {}

  @Mutation(() => Contact)
  createContact(@Args('createContactInput') createContactInput: CreateContactInput): Promise<Contact> {
    return this.contactService.create(createContactInput);
  }

  @Query(() => [Contact], { name: 'contacts' })
  findAll(): Promise<Contact[]> {
    return this.contactService.findAll();
  }

  @Query(() => Contact, { name: 'contact', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Contact | null> {
    return this.contactService.findOne(id);
  }

  @Mutation(() => Contact, { nullable: true })
  updateContact(
    @Args('id', { type: () => Int }) id: number,
      @Args('updateContactInput') updateContactInput: UpdateContactInput,
  ): Promise<Contact | null> {
    return this.contactService.update(id, updateContactInput);
  }

  @Mutation(() => Contact)
  removeContact(@Args('id', { type: () => Int }) id: number): Promise<Contact> {
    return this.contactService.remove(id);
  }
}
