import {
  Resolver, Query, Mutation, Args, Int, registerEnumType,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common/decorators';
import { GqlJwtAuthGuard } from 'src/auth/guards/gql-jwt-auth.guard';
import { RolesEnum } from '@prisma/client';
import { RolesService } from './roles.service';
import { CreateUserRoleInput } from './dto/create-user-role.input';
import { UserRole } from './models/user-role.models';
import { UserRoleModel } from './models/user-role';

@Resolver(() => UserRole)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => UserRole)
  createUserRole(
    @Args('createUserRoleInput') createUserRoleInput: CreateUserRoleInput,
  ): Promise<UserRoleModel> {
    return this.rolesService.createUserRole(createUserRoleInput);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => [UserRole], { name: 'userRoles' })
  findAllUserRole(
    @Args('user_id', { type: () => Int }) user_id: number,
      @Args('skip', { type: () => Int, nullable: true }) skip?: number,
      @Args('take', { type: () => Int, nullable: true }) take?: number,
  ): Promise<UserRoleModel[]> {
    return this.rolesService.findAllUserRole(user_id, skip, take);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Query(() => UserRole, { name: 'userRole', nullable: true })
  findOneUserRole(
    @Args('user_id', { type: () => Int }) user_id: number,
      @Args('role_name', { type: () => RolesEnum }) role_name: RolesEnum,
  ): Promise<UserRoleModel | null> {
    return this.rolesService.findOneUserRole(user_id, role_name);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => UserRole)
  removeUserRole(
    @Args('user_id', { type: () => Int }) user_id: number,
      @Args('role_name', { type: () => RolesEnum }) role_name: RolesEnum,
  ): Promise<UserRoleModel> {
    return this.rolesService.deleteUserRole(user_id, role_name);
  }
}
registerEnumType(RolesEnum, {
  name: 'RolesEnum',
});
