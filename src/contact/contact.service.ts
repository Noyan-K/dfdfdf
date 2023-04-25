import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { Contact } from './models/contact.model';

@Injectable()
export class ContactService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createContactInput: CreateContactInput): Promise<Contact> {
    return this.prismaService.contact.create({ data: createContactInput });
  }

  findAll(
    take?: number,
    skip?: number,
  ): Promise<Contact[]> {
    return this.prismaService.contact.findMany({ take, skip });
  }

  findOne(id: number): Promise<Contact | null> {
    return this.prismaService.contact.findFirst({ where: { id } });
  }

  async update(id: number, updateContactInput: UpdateContactInput): Promise<Contact | null> {
    await this.prismaService.contact.updateMany({ where: { id }, data: updateContactInput });

    return this.prismaService.contact.findFirst({ where: { id } });
  }

  remove(id: number): Promise<Contact> {
    return this.prismaService.contact.delete({ where: { id } });
  }
}
