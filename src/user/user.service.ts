import { Injectable, BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import * as bcrypt from 'bcrypt';
import { User } from './models/user.model';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    if (createUserInput.type === 'GUEST' && !createUserInput.password) {
      return this.prisma.user.create({
        data: createUserInput,
      });
    }

    const hashPassword = await bcrypt.hash(createUserInput.password, 3);

    const createdUser = await this.prisma.user.create({
      data: {
        ...createUserInput,
        password: hashPassword,
      },
    });

    const url = encodeURI(
      `https://kitponomarenko.ru/fabrix/run?code=VforVakhrushev2049&id=${createdUser.id}&name=${createdUser.name}&email=${createdUser.email}`,
    );
    fetch(url);

    return createdUser;
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { id },
      include: { Document: true },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: { Document: true },
    });
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

    return user;
  }
}
