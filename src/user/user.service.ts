import { Injectable, BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { User } from './models/user.model';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { DocumentService } from '../document/document.service';
import { Document } from '../document/models/document.model';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly documentService: DocumentService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const receivedCurrency = await this.prisma.currency.findFirst({ where: { name: { mode: 'insensitive', equals: 'rub' } } });

    if (createUserInput.type === 'GUEST' && !createUserInput.password) {
      return this.prisma.user.create({
        data: {
          ...createUserInput,
          currency_id: receivedCurrency?.id ?? null,
        },
      });
    }

    const hashPassword = await bcrypt.hash(createUserInput.password, 3);

    return this.prisma.user.create({
      data: {
        ...createUserInput,
        password: hashPassword,
        currency_id: receivedCurrency?.id ?? null,
      },
    });
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(
    user_id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User | null> {
    const receivedUser = await this.findOne(user_id);

    if (!receivedUser) {
      throw new NotFoundException('User not found!');
    }

    if (receivedUser.type === 'GUEST' || !receivedUser.password) {
      throw new BadRequestException();
    }

    const doesPasswordMatches = await bcrypt.compare(
      updateUserInput.password,
      receivedUser.password,
    );

    if (!doesPasswordMatches) {
      throw new BadRequestException('Wrong passwords.');
    }

    const newPasswordHash = await bcrypt.hash(updateUserInput.newPassword, 3);

    const { newPassword, password, ...newUpdateUserInput } = updateUserInput;

    await this.prisma.user.update({
      where: { id: user_id },
      data: {
        ...newUpdateUserInput,
        password: newPasswordHash,
      },
    });

    return this.prisma.user.findUnique({ where: { id: user_id } });
  }

  async getProfile(id: number): Promise<User | null> {
    const user: User | null = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found!');

    if (user.document_id) {
      user.Document = (await this.documentService.getDocument(
        user.document_id,
      )) as Document;
    }

    return user;
  }
}
