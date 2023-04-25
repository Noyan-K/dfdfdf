import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLanguageInput } from './dto/create-language.input';
import { UpdateLanguageInput } from './dto/update-language.input';
import { LanguageModel } from './models/language';

@Injectable()
export class LanguageService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createLanguageInput: CreateLanguageInput): Promise<LanguageModel> {
    return this.prismaService.language.create({ data: createLanguageInput });
  }

  findAll(skip?: number, take?: number): Promise<LanguageModel[]> {
    return this.prismaService.language.findMany({ skip, take });
  }

  findOne(id: number): Promise<LanguageModel | null> {
    return this.prismaService.language.findUnique({ where: { id } });
  }

  async update(
    updateLanguageInput: UpdateLanguageInput,
  ): Promise<LanguageModel | null> {
    await this.prismaService.language.update({
      where: { id: updateLanguageInput.id },
      data: updateLanguageInput,
    });

    return this.prismaService.language.findFirst({
      where: { id: updateLanguageInput.id },
    });
  }

  remove(id: number): Promise<LanguageModel> {
    return this.prismaService.language.delete({ where: { id } });
  }
}
