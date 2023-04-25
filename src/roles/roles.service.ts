import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesEnum, UserRole } from '@prisma/client';
import { CreateUserRoleInput } from './dto/create-user-role.input';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}

  createUserRole(createUserRoleInput: CreateUserRoleInput): Promise<UserRole> {
    return this.prismaService.userRole.upsert({
      where: {
        user_id_role_name: {
          user_id: createUserRoleInput.user_id,
          role_name: createUserRoleInput.role_name,
        },
      },
      update: { deleted_at: null },
      create: createUserRoleInput,
    });
  }

  findAllUserRole(
    user_id: number,
    skip: number | undefined,
    take: number | undefined,
  ): Promise<UserRole[]> {
    return this.prismaService.userRole.findMany({
      where: { user_id },
      skip,
      take,
    });
  }

  findOneUserRole(
    user_id: number,
    role_name: RolesEnum,
  ): Promise<UserRole | null> {
    return this.prismaService.userRole.findFirst({
      where: { user_id, role_name },
    });
  }

  deleteUserRole(user_id: number, role_name: RolesEnum): Promise<UserRole> {
    return this.prismaService.userRole.delete({
      where: { user_id_role_name: { user_id, role_name } },
    });
  }
}
