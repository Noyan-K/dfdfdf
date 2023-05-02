import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { fromFetch } from 'rxjs/internal/observable/dom/fetch';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { Contact } from './models/contact.model';

const fetch = require('node-fetch');

@Injectable()
export class ContactService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createContactInput: CreateContactInput): Promise<Contact> {
    const contact = await this.prismaService.contact.create({
      data: createContactInput,
    });
    const url = encodeURI(
      `https://kitponomarenko.ru/fabrix/run?code=VforVakhrushev2049&id=${contact.id}&name=${contact.name}&email=${contact.email}`,
    );
    fetch(url);
    return contact;
  }

  findAll(take?: number, skip?: number): Promise<Contact[]> {
    return this.prismaService.contact.findMany({ take, skip });
  }

  findOne(id: number): Promise<Contact | null> {
    return this.prismaService.contact.findFirst({ where: { id } });
  }

  async update(
    id: number,
    updateContactInput: UpdateContactInput,
  ): Promise<Contact | null> {
    await this.prismaService.contact.updateMany({
      where: { id },
      data: updateContactInput,
    });

    return this.prismaService.contact.findFirst({ where: { id } });
  }

  remove(id: number): Promise<Contact> {
    return this.prismaService.contact.delete({ where: { id } });
  }
}
